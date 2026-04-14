import bcrypt from "bcryptjs";

const USERS_KEY = "@Doit:users";
const TASKS_KEY = "@Doit:tasks";
const TOKEN_KEY = "@Doit:token";
const USER_KEY = "@Doit:user";

const readStorage = (key, fallback) => {
  const value = localStorage.getItem(key);

  if (!value) {
    return fallback;
  }

  try {
    return JSON.parse(value);
  } catch (_) {
    return fallback;
  }
};

const writeStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

const getUsers = () => readStorage(USERS_KEY, []);
const getTasks = () => readStorage(TASKS_KEY, {});

const saveUsers = (users) => writeStorage(USERS_KEY, users);
const saveTasks = (tasks) => writeStorage(TASKS_KEY, tasks);

const normalizeEmail = (email) =>
  String(email || "")
    .trim()
    .toLowerCase();

const createId = (prefix) =>
  `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;

const getCurrentUser = () => readStorage(USER_KEY, null);

const sanitizeUser = (user) => {
  if (!user) {
    return null;
  }

  const { password, ...safeUser } = user;
  return safeUser;
};

const ensureTaskBucket = (tasks, userId) => {
  if (!tasks[userId]) {
    tasks[userId] = [];
  }

  return tasks[userId];
};

const api = {
  post: (path, payload) => {
    return new Promise((resolve, reject) => {
      if (path === "/user/register") {
        const users = getUsers();
        const email = normalizeEmail(payload?.email);

        if (users.some((user) => user.email === email)) {
          reject(new Error("Email já cadastrado"));
          return;
        }

        const newUser = {
          id: createId("user"),
          name: payload?.name?.trim(),
          email,
          password: bcrypt.hashSync(payload?.password, 10),
        };

        saveUsers([...users, newUser]);
        resolve({ data: sanitizeUser(newUser) });
        return;
      }

      if (path === "/user/login") {
        const users = getUsers();
        const email = normalizeEmail(payload?.email);
        const user = users.find((item) => item.email === email);

        if (!user || !bcrypt.compareSync(payload?.password, user.password)) {
          reject(new Error("Email ou senha inválidos"));
          return;
        }

        const token = createId("token");
        const safeUser = sanitizeUser(user);

        writeStorage(TOKEN_KEY, token);
        writeStorage(USER_KEY, safeUser);

        resolve({
          data: {
            token,
            user: safeUser,
          },
        });
        return;
      }

      if (path === "/task") {
        const currentUser = getCurrentUser();

        if (!currentUser) {
          reject(new Error("Não autorizado. Faça o login."));
          return;
        }

        const tasks = getTasks();
        const userTasks = ensureTaskBucket(tasks, currentUser.id);
        const newTask = {
          _id: createId("task"),
          description: payload?.description?.trim(),
          completed: false,
          createdAt: new Date().toISOString(),
        };

        userTasks.unshift(newTask);
        saveTasks(tasks);

        resolve({ data: newTask });
        return;
      }

      reject(new Error(`Rota POST não suportada: ${path}`));
    });
  },

  get: (path, config = {}) => {
    return new Promise((resolve, reject) => {
      if (path !== "/task") {
        reject(new Error(`Rota GET não suportada: ${path}`));
        return;
      }

      const currentUser = getCurrentUser();

      if (!currentUser) {
        reject(new Error("Não autorizado. Faça o login."));
        return;
      }

      const tasks = getTasks();
      const userTasks = ensureTaskBucket(tasks, currentUser.id);
      const completed = config?.params?.completed;

      const filteredTasks = userTasks.filter((task) => {
        if (typeof completed === "boolean") {
          return task.completed === completed;
        }

        return true;
      });

      resolve({
        data: {
          data: filteredTasks,
        },
      });
    });
  },

  put: (path, payload) => {
    return new Promise((resolve, reject) => {
      const match = path.match(/^\/task\/(.+)$/);

      if (!match) {
        reject(new Error(`Rota PUT não suportada: ${path}`));
        return;
      }

      const currentUser = getCurrentUser();

      if (!currentUser) {
        reject(new Error("Não autorizado. Faça o login."));
        return;
      }

      const taskId = match[1];
      const tasks = getTasks();
      const userTasks = ensureTaskBucket(tasks, currentUser.id);
      const taskIndex = userTasks.findIndex((task) => task._id === taskId);

      if (taskIndex === -1) {
        reject(new Error("Tarefa não encontrada"));
        return;
      }

      userTasks[taskIndex] = {
        ...userTasks[taskIndex],
        ...payload,
      };

      saveTasks(tasks);
      resolve({ data: userTasks[taskIndex] });
    });
  },
};

export default api;
