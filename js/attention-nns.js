class TransformerInfo extends NeuralNetInfo {
  static id            = 'transformer';
  static displayName   = 'Transformer';
  static category      = 'attention';
  static year          = 2017;
  static authors       = 'Ashish Vaswani, Noam Shazeer, Niki Parmar, Jakob Uszkoreit, Llion Jones, Aidan N. Gomez, Łukasz Kaiser, Illia Polosukhin';
  static institution   = 'Google Brain / Google Research';
  static description   = 'The Transformer replaces recurrence entirely with self-attention: every position in a sequence attends to every other position simultaneously, computing weighted sums of values based on query-key similarities. Positional encodings replace the implicit ordering of RNNs.';
  static significance  = 'Eliminated the sequential bottleneck of RNNs, enabling full parallelism during training. The Transformer architecture became the foundation of virtually every state-of-the-art NLP and multimodal model — BERT, GPT, T5, ViT, and beyond.';
  static paperTitle    = 'Attention Is All You Need';
  static paperUrl      = 'https://arxiv.org/abs/1706.03762';
  static keyInnovation = 'Multi-head self-attention: every token attends to every other token in O(n²) time but fully in parallel, with no recurrence';
  static predecessor   = 'Gated Recurrent Unit (GRU)';
  static successor     = 'BERT / GPT';
  static goodFor       = ['Machine translation', 'Long-range dependencies', 'Parallelizable training'];
  static limitations   = ['O(n²) attention cost with sequence length', 'Large memory footprint', 'Needs positional encodings (no inherent order)'];
  static connectionType = 'attention';
  static defaultLayers  = [
    { label: 'Input Embed', size: 4 },
    { label: 'Self-Attn', size: 4 },
    { label: 'FFN', size: 4 },
    { label: 'Self-Attn', size: 4 },
    { label: 'FFN', size: 4 },
    { label: 'Output', size: 3 },
  ];
}

class BERTInfo extends NeuralNetInfo {
  static id            = 'bert';
  static displayName   = 'BERT';
  static category      = 'attention';
  static year          = 2018;
  static authors       = 'Jacob Devlin, Ming-Wei Chang, Kenton Lee, Kristina Toutanova';
  static institution   = 'Google AI Language';
  static description   = 'BERT (Bidirectional Encoder Representations from Transformers) pre-trains the Transformer encoder on two tasks: masked language modeling (predict randomly masked tokens) and next-sentence prediction. It reads the entire sequence left-to-right and right-to-left simultaneously.';
  static significance  = 'Introduced the pre-train then fine-tune paradigm for NLP. By pre-training on massive text corpora, BERT learns rich contextual representations that transfer to many downstream tasks with minimal task-specific data, setting new records across 11 NLP benchmarks.';
  static paperTitle    = 'BERT: Pre-training of Deep Bidirectional Transformers for Language Understanding';
  static paperUrl      = 'https://arxiv.org/abs/1810.04805';
  static keyInnovation = 'Bidirectional pre-training via masked language modeling — context flows from both left and right simultaneously';
  static predecessor   = 'Transformer';
  static successor     = 'GPT-2 / RoBERTa / T5';
  static goodFor       = ['Text classification', 'Named entity recognition', 'Question answering', 'Transfer learning'];
  static limitations   = ['Encoder-only: not suited for generation', 'Expensive to pre-train', 'Fixed sequence length limit'];
  static connectionType = 'attention';
  static defaultLayers  = [
    { label: 'Token Embed', size: 5 },
    { label: 'Encoder ×1', size: 5 },
    { label: 'Encoder ×2', size: 5 },
    { label: 'Encoder ×N', size: 5 },
    { label: '[CLS] Output', size: 3 },
  ];
}

class GPTInfo extends NeuralNetInfo {
  static id            = 'gpt';
  static displayName   = 'GPT';
  static category      = 'attention';
  static year          = 2018;
  static authors       = 'Alec Radford, Karthik Narasimhan, Tim Salimans, Ilya Sutskever';
  static institution   = 'OpenAI';
  static description   = 'GPT (Generative Pre-trained Transformer) uses the Transformer decoder stack with causal (masked) self-attention: each token can only attend to tokens before it. It is pre-trained to predict the next token autoregressively on large text corpora, then fine-tuned on downstream tasks.';
  static significance  = 'Showed that a large-scale language model pre-trained with next-token prediction could be fine-tuned to match or exceed task-specific models across diverse NLP benchmarks. The GPT lineage (GPT-2, GPT-3, GPT-4) scaled this insight into modern large language models.';
  static paperTitle    = 'Improving Language Understanding by Generative Pre-Training';
  static paperUrl      = 'https://openai.com/index/language-unsupervised/';
  static keyInnovation = 'Causal (left-to-right) self-attention enabling autoregressive text generation at scale';
  static predecessor   = 'Transformer';
  static successor     = 'GPT-2 / GPT-3 / GPT-4';
  static goodFor       = ['Text generation', 'Language modeling', 'Few-shot learning (GPT-3+)'];
  static limitations   = ['Unidirectional context (left only)', 'Expensive inference at scale', 'Can hallucinate plausible-sounding facts'];
  static connectionType = 'attention';
  static defaultLayers  = [
    { label: 'Token Embed', size: 5 },
    { label: 'Decoder ×1', size: 5 },
    { label: 'Decoder ×2', size: 5 },
    { label: 'Decoder ×N', size: 5 },
    { label: 'Next Token', size: 4 },
  ];
}

NeuralNetRegistry.register(TransformerInfo);
NeuralNetRegistry.register(BERTInfo);
NeuralNetRegistry.register(GPTInfo);
