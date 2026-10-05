import legacyProjects from './legacy-projects.json'

export interface Project {
  slug: string
  title: string
  year: string
  category: string
  description: string
  context: string
  paragraphs: string[]
  highlights: string[]
  links: { label: string; url: string }[]
  sourceId?: string
  cover?: string
}

// Newer work from the CV, followed by the complete projects from the previous site.
const researchProjects: Project[] = [
  {
    slug: 'language-representations',
    title: 'Language representations & the brain',
    year: '2025–present',
    category: 'Language · Neuroscience',
    description:
      'Exploring the relationship between language model representations and human neural responses.',
    context: 'Language Intelligence Lab, Georgia Tech · With Dr. Anna Ivanova',
    paragraphs: [
      'How do language models represent meaning, and how do those representations relate to the human language network? At Georgia Tech’s Language Intelligence Lab, I investigate the geometry of hidden activations and their alignment with neural responses.',
      'The work combines linear probes, prompt recovery, and representational similarity analysis. These methods help test which representational subspaces predict neural responses, what information is retained in hidden activations, and how semantic alignment changes across model layers.'
    ],
    highlights: [
      'Probed hidden activations to identify subspaces that predict neural responses.',
      'Explored prompt recovery as a diagnostic for semantic compression.',
      'Compared LLM hidden states with voxel-wise fMRI responses.'
    ],
    links: []
  },
  {
    slug: 'multitask-vision',
    title: 'Vision models & the ventral stream',
    year: '2025',
    category: 'Vision · ICLR 2025',
    description:
      'Studying how spatial latent estimation shapes visual representations and their alignment with the brain.',
    context: 'DiCarlo Lab, MIT · RSI 2024 · With Yudi Xie and Dr. James J. DiCarlo',
    paragraphs: [
      'This project investigates the relationship between visual learning objectives, representation geometry, and biological vision. The resulting work, “Vision Models Trained to Estimate Spatial Latents Learn Ventral-Stream-Aligned Representations,” appeared at ICLR 2025.',
      'My contributions focused on model analysis, representation similarity experiments, and hypothesis testing. I implemented CKA and RSA methods and used them to test relationships between architectural inductive biases and learned representations.'
    ],
    highlights: [
      'Implemented centered kernel alignment (CKA) and representational similarity analysis (RSA).',
      'Tested hypotheses linking representation geometry to architectural inductive biases.',
      'Contributed model analysis and representation similarity experiments to the ICLR 2025 paper.'
    ],
    links: [
      { label: 'Paper', url: 'https://openreview.net/pdf?id=emMMa4q0qw' },
      { label: 'Code', url: 'https://github.com/YudiXie/multitask-vision' },
      {
        label: 'MIT News',
        url: 'https://news.mit.edu/2025/visual-pathway-brain-may-do-more-than-recognize-objects-0415'
      }
    ]
  },
  {
    slug: 'multimodal-contrastive-learning',
    title: 'Multimodal contrastive learning',
    year: '2023–2024',
    category: 'Medical imaging · Representation learning',
    description:
      'Combining medical images and clinical data for Alzheimer’s disease prediction with contrastive learning.',
    context: '',
    paragraphs: [
      'Medical diagnosis often involves several different kinds of information. This work explores how to learn useful representations across MRI images and tabular clinical features, using multimodal contrastive learning and tabular attention.',
      'The ICCV 2023 work achieved Alzheimer’s prediction accuracy above 83.8%. A subsequent adaptive graph construction framework extends contrastive learning to an arbitrary number of modalities, improving generalizability. That work appeared in the NeurIPS 2024 High School Projects track, placing in the top four of 335 projects.'
    ],
    highlights: [
      'Built a multimodal framework combining MRI with tabular clinical features.',
      'Used tabular attention to improve Alzheimer’s disease prediction.',
      'Developed adaptive graph construction to learn from varying numbers of modalities.'
    ],
    links: [
      { label: 'ICCV paper', url: 'https://arxiv.org/abs/2308.15469' },
      { label: 'Code', url: 'https://github.com/weichen-huang/iccv23' },
      { label: 'Adaptive graph paper', url: 'https://arxiv.org/abs/2410.06395' }
    ]
  },
  {
    slug: 'connections',
    title: 'NYT Connections solver',
    year: '',
    category: 'Language · A small experiment',
    description: 'Using language model entropy to solve the NYT Connections word game.',
    context: 'Independent project',
    paragraphs: [
      'A small project exploring how language model entropy can help solve NYT Connections: a word game that asks players to identify groups of words with something in common.'
    ],
    highlights: ['Explored language model entropy as a signal for solving word-grouping puzzles.'],
    links: [{ label: 'Code', url: 'https://github.com/weichen-huang/connections' }]
  }
]

export const projects: Project[] = [...researchProjects, ...legacyProjects]
// Enrich the migrated demo with the related research from the CV.
const cxr = projects.find((project) => project.slug === 'cxr_zs')!
cxr.description =
  'Mitigating spurious correlations in chest X-ray interpretation through reinforcement learning and self-supervision, with a cross-modal prediction demo.'
cxr.context = ''
cxr.paragraphs = [
  'Models trained to interpret chest X-rays can pick up spurious correlations rather than the information needed for reliable predictions. This research studies that problem and applies reinforcement learning alongside self- and semi-supervised training to improve robustness.',
  'The research was published at IMVIP 2023. CXR Predict provides a related demo of self-supervised cross-modal representation learning.'
]
cxr.links = [
  { label: 'Publication', url: 'https://zenodo.org/records/8245236' },
  { label: 'Try the demo', url: 'https://huggingface.co/spaces/whuang06/CXR_predict' }
]
