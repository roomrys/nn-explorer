class PerceptronInfo extends NeuralNetInfo {
  static id            = 'perceptron';
  static displayName   = 'Perceptron';
  static category      = 'feedforward';
  static year          = 1958;
  static authors       = 'Frank Rosenblatt';
  static institution   = 'Cornell Aeronautical Laboratory';
  static description   = 'The Perceptron is the earliest trainable single-layer neural network. It takes weighted inputs, sums them, and passes the result through a step function to produce a binary output. Training adjusts weights based on misclassified examples.';
  static significance  = 'The Perceptron was the first algorithm that could automatically learn to classify inputs, sparking decades of interest in machine learning and laying the conceptual groundwork for all modern neural networks.';
  static paperTitle    = 'The Perceptron: A Probabilistic Model for Information Storage and Organization in the Brain';
  static paperUrl      = 'https://psycnet.apa.org/record/1959-09865-001';
  static keyInnovation = 'Weighted input summation with a threshold activation function, trained via the Perceptron learning rule';
  static predecessor   = null;
  static successor     = 'Multilayer Perceptron (MLP)';
  static goodFor       = ['Binary classification', 'Linearly separable problems', 'Historical reference'];
  static limitations   = ['Cannot learn XOR or non-linear boundaries', 'No hidden layers', 'Limited representational capacity'];
  static connectionType = 'dense';
  static defaultLayers  = [
    { label: 'Input', size: 4 },
    { label: 'Output', size: 1 },
  ];
}

class MLPInfo extends NeuralNetInfo {
  static id            = 'mlp';
  static displayName   = 'Multilayer Perceptron (MLP)';
  static category      = 'feedforward';
  static year          = 1986;
  static authors       = 'David Rumelhart, Geoffrey Hinton, Ronald Williams';
  static institution   = 'UC San Diego / Carnegie Mellon University';
  static description   = 'The Multilayer Perceptron extends the Perceptron with one or more hidden layers and continuous activation functions (e.g. sigmoid or ReLU). Backpropagation efficiently computes gradients through all layers, enabling end-to-end learning.';
  static significance  = 'Backpropagation solved the credit-assignment problem for deep networks, making it possible to train networks with hidden layers. This was the key breakthrough that made modern deep learning possible.';
  static paperTitle    = 'Learning Representations by Back-propagating Errors';
  static paperUrl      = 'https://www.nature.com/articles/323533a0';
  static keyInnovation = 'Backpropagation algorithm enabling gradient-based training through multiple hidden layers';
  static predecessor   = 'Perceptron';
  static successor     = 'Convolutional Neural Network (CNN)';
  static goodFor       = ['Tabular data', 'Function approximation', 'Multi-class classification'];
  static limitations   = ['Poor at spatial/sequential data', 'Many parameters for image inputs', 'Vanishing gradients in deep networks'];
  static connectionType = 'dense';
  static defaultLayers  = [
    { label: 'Input', size: 4 },
    { label: 'Hidden 1', size: 5 },
    { label: 'Hidden 2', size: 4 },
    { label: 'Output', size: 3 },
  ];
}

NeuralNetRegistry.register(PerceptronInfo);
NeuralNetRegistry.register(MLPInfo);
