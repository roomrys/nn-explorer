class LeNetInfo extends NeuralNetInfo {
  static id            = 'lenet';
  static displayName   = 'LeNet / CNN';
  static category      = 'convolutional';
  static year          = 1989;
  static authors       = 'Yann LeCun, Léon Bottou, Yoshua Bengio, Patrick Haffner';
  static institution   = 'AT&T Bell Laboratories';
  static description   = 'LeNet introduced the convolutional neural network architecture: locally-connected filters that slide across the input to detect features, followed by pooling layers that reduce spatial resolution, and fully-connected layers for classification.';
  static significance  = 'Demonstrated that spatial structure in data (images) can be exploited by weight sharing across positions, dramatically reducing parameters and improving generalization. Used commercially for postal digit recognition throughout the 1990s.';
  static paperTitle    = 'Gradient-Based Learning Applied to Document Recognition';
  static paperUrl      = 'http://yann.lecun.com/exdb/publis/pdf/lecun-01a.pdf';
  static keyInnovation = 'Shared convolutional filters with local receptive fields — the same kernel detects a feature regardless of its position in the image';
  static predecessor   = 'Multilayer Perceptron (MLP)';
  static successor     = 'AlexNet / ResNet';
  static goodFor       = ['Image classification', 'Spatial feature detection', 'Translation-invariant pattern recognition'];
  static limitations   = ['Fixed input size', 'Struggles with very deep stacking due to vanishing gradients', 'Limited receptive field without many layers'];
  static connectionType = 'local';
  static defaultLayers  = [
    { label: 'Input', size: 6 },
    { label: 'Conv 1', size: 5 },
    { label: 'Pool 1', size: 3 },
    { label: 'Conv 2', size: 4 },
    { label: 'FC', size: 3 },
    { label: 'Output', size: 2 },
  ];
}

class ResNetInfo extends NeuralNetInfo {
  static id            = 'resnet';
  static displayName   = 'ResNet';
  static category      = 'convolutional';
  static year          = 2015;
  static authors       = 'Kaiming He, Xiangyu Zhang, Shaoqing Ren, Jian Sun';
  static institution   = 'Microsoft Research Asia';
  static description   = 'ResNet introduced residual (skip) connections that add the input of a block directly to its output: F(x) + x. This allows gradients to flow unimpeded through hundreds or thousands of layers, enabling extremely deep networks.';
  static significance  = 'Won ILSVRC 2015 with 152 layers — far deeper than anything trained before. Residual connections became a universal building block in deep learning, appearing in vision, language, and multimodal models.';
  static paperTitle    = 'Deep Residual Learning for Image Recognition';
  static paperUrl      = 'https://arxiv.org/abs/1512.03385';
  static keyInnovation = 'Residual (skip) connections: F(x) + x, bypassing one or more layers to prevent vanishing gradients in very deep networks';
  static predecessor   = 'LeNet / CNN';
  static successor     = 'Transformer (vision)';
  static goodFor       = ['Very deep networks', 'Image classification & detection', 'Transfer learning backbone'];
  static limitations   = ['Higher memory usage than plain CNNs', 'More complex architecture to implement from scratch'];
  static connectionType = 'skip';
  static defaultLayers  = [
    { label: 'Input', size: 4 },
    { label: 'Conv', size: 4 },
    { label: 'Res Block', size: 4 },
    { label: 'Res Block', size: 4 },
    { label: 'Pool', size: 3 },
    { label: 'Output', size: 2 },
  ];
  static skipConnections = [[1, 3], [3, 5]]; // layer index pairs that have skip connections
}

NeuralNetRegistry.register(LeNetInfo);
NeuralNetRegistry.register(ResNetInfo);
