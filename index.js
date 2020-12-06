const storage = {
  get(key, check = true, delay = 5) {
    if (!key) {
      console.error("Key is missing");
      return;
    }
    try {
      const now = new Date().getTime();
      const values = JSON.parse(localStorage.getItem(key));
      if (values && values.data) {
        if (check && values.time) {
          let diff = (now - values.time) / 1000;
          diff /= 60;
          diff = Math.abs(Math.round(diff));
          if (diff > delay) this.remove(key);
        }
        return values.data;
      }
    } catch (e) {
      this.remove(key);
    }
  },

  set(key, value, nullable = true) {
    if (key == "undefined") return console.error("Key is missing");
    if (value == "undefined") return console.error("Value is missing");
    if (!value || value == {} || (Array.isArray(value) && !value.length)) {
      if (nullable) this.remove(key);
      return null;
    }

    try {
      const now = new Date().getTime();
      localStorage.setItem(key, JSON.stringify({ data: value, time: now }));
    } catch (e) {
      console.error(e);
    }
  },

  remove(key) {
    localStorage.removeItem(key);
  }
};
storage.read = storage.get;
storage.write = storage.set;
storage.del = storage.remove;

export default storage;
