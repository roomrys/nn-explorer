class RNNInfo extends NeuralNetInfo {
  static id            = 'rnn';
  static displayName   = 'Recurrent Neural Network (RNN)';
  static category      = 'recurrent';
  static year          = 1986;
  static authors       = 'David Rumelhart, Geoffrey Hinton, Ronald Williams';
  static institution   = 'UC San Diego / Carnegie Mellon University';
  static description   = 'The RNN processes sequences by maintaining a hidden state that is updated at each time step using both the current input and the previous hidden state. This allows the network to incorporate context from earlier in the sequence.';
  static significance  = 'The first architecture capable of modeling sequential dependencies in data. Introduced the concept of a recurrent hidden state — a foundational idea carried forward into LSTM, GRU, and attention mechanisms.';
  static paperTitle    = 'Learning Representations by Back-propagating Errors';
  static paperUrl      = 'https://www.nature.com/articles/323533a0';
  static keyInnovation = 'Recurrent hidden state h_t = f(W·x_t + U·h_{t-1}) that carries information across time steps';
  static predecessor   = 'Multilayer Perceptron (MLP)';
  static successor     = 'Long Short-Term Memory (LSTM)';
  static goodFor       = ['Short sequences', 'Language modeling basics', 'Time series'];
  static limitations   = ['Vanishing gradient over long sequences', 'Cannot capture long-range dependencies', 'Sequential: hard to parallelize'];
  static connectionType = 'recurrent';
  static defaultLayers  = [
    { label: 'Input', size: 3 },
    { label: 'Hidden', size: 4 },
    { label: 'Output', size: 3 },
  ];
  static recurrentLayer = 1; // index of the layer with the self-loop
}

class LSTMInfo extends NeuralNetInfo {
  static id            = 'lstm';
  static displayName   = 'Long Short-Term Memory (LSTM)';
  static category      = 'recurrent';
  static year          = 1997;
  static authors       = 'Sepp Hochreiter, Jürgen Schmidhuber';
  static institution   = 'Technische Universität München';
  static description   = 'The LSTM replaces the simple RNN hidden state with a cell that has three gating mechanisms: an input gate (what to write), a forget gate (what to erase), and an output gate (what to read). This allows gradients to flow across hundreds of time steps without vanishing.';
  static significance  = 'Solved the vanishing gradient problem in recurrent networks, enabling models that genuinely learn long-range dependencies. LSTMs dominated sequence modeling for two decades and are still widely used in production systems.';
  static paperTitle    = 'Long Short-Term Memory';
  static paperUrl      = 'https://www.bioinf.jku.at/publications/older/2604.pdf';
  static keyInnovation = 'Gated cell state with forget, input, and output gates — gradients flow through the cell state with minimal decay';
  static predecessor   = 'Recurrent Neural Network (RNN)';
  static successor     = 'Gated Recurrent Unit (GRU)';
  static goodFor       = ['Long sequences', 'Machine translation', 'Speech recognition', 'Text generation'];
  static limitations   = ['Slower to train than GRU', 'More parameters per cell', 'Still sequential: no parallelism'];
  static connectionType = 'recurrent';
  static defaultLayers  = [
    { label: 'Input', size: 3 },
    { label: 'LSTM Cell', size: 5 },
    { label: 'Output', size: 3 },
  ];
  static recurrentLayer = 1;
}

class GRUInfo extends NeuralNetInfo {
  static id            = 'gru';
  static displayName   = 'Gated Recurrent Unit (GRU)';
  static category      = 'recurrent';
  static year          = 2014;
  static authors       = 'Kyunghyun Cho, Bart van Merrienboer, Caglar Gulcehre, Yoshua Bengio et al.';
  static institution   = 'Université de Montréal';
  static description   = 'The GRU simplifies the LSTM by merging the cell state and hidden state into one, and collapsing the input and forget gates into a single update gate with a complementary reset gate. It matches LSTM performance on most tasks with fewer parameters.';
  static significance  = 'Demonstrated that LSTMs gating mechanism could be simplified without loss of capability, offering a faster and more parameter-efficient alternative. Widely used where speed matters more than marginal accuracy.';
  static paperTitle    = 'Learning Phrase Representations using RNN Encoder-Decoder for Statistical Machine Translation';
  static paperUrl      = 'https://arxiv.org/abs/1406.1078';
  static keyInnovation = 'Two-gate design (update + reset) that merges LSTM\'s cell state and hidden state into one vector';
  static predecessor   = 'Long Short-Term Memory (LSTM)';
  static successor     = 'Transformer';
  static goodFor       = ['Sequences where speed matters', 'Smaller datasets', 'Embedded/resource-constrained deployment'];
  static limitations   = ['Slightly worse than LSTM on very long sequences', 'Still sequential'];
  static connectionType = 'recurrent';
  static defaultLayers  = [
    { label: 'Input', size: 3 },
    { label: 'GRU Cell', size: 5 },
    { label: 'Output', size: 3 },
  ];
  static recurrentLayer = 1;
}

NeuralNetRegistry.register(RNNInfo);
NeuralNetRegistry.register(LSTMInfo);
NeuralNetRegistry.register(GRUInfo);
