export default class Modal {
  constructor(data = []) {
    this.$collection = [];

    if (data.length) {
      this.record(data);
    }
  }
  record(data) {
    const primaryKey = "id";
    const mappedData = data.map((entry) => {
      if (entry[primaryKey]) return entry;
      entry[primaryKey] = Date.now();
      return entry;
    });
    this.$collection.push(...mappedData);
  }
  all() {
    return this.$collection.map((entry) => Object.assign({}, entry));
  }
  find(value) {
    const entry =
      typeof value === "number"
        ? this.$collection.find((entry) => entry.id === value)
        : this.$collection.find((entry) => entry.name === value);
    return entry ? Object.assign({}, entry) : null;
  }
  update(key, data) {
    const primaryKey = "id";
    const index = this.$collection.findIndex(
      (entry) => entry[primaryKey] === key
    );
    if (index < 0) return false;
    this.$collection.splice(
      index,
      1,
      Object.assign(this.$collection[index], data)
    );
  }
}
