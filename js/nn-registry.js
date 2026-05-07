class NeuralNetInfo {
  static id            = '';
  static displayName   = '';
  static category      = ''; // 'feedforward' | 'convolutional' | 'recurrent' | 'attention'
  static year          = null;
  static authors       = '';
  static institution   = '';
  static description   = '';
  static significance  = '';
  static paperTitle    = null;
  static paperUrl      = null; // prefer arxiv
  static keyInnovation = '';
  static predecessor   = null;
  static successor     = null;
  static goodFor       = [];
  static limitations   = [];

  // Visualizer hints
  static connectionType = 'dense'; // 'dense' | 'local' | 'recurrent' | 'attention' | 'skip'
  static defaultLayers  = [];      // [{label, size}]
}

class NeuralNetRegistry {
  static _map = new Map();

  static register(infoClass) {
    this._map.set(infoClass.id, infoClass);
  }

  static getById(id) {
    return this._map.get(id) ?? null;
  }

  static getAll() {
    return [...this._map.values()];
  }

  static getByCategory(cat) {
    return this.getAll().filter(n => n.category === cat);
  }
}
