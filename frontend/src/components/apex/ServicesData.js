import { Workflow, Bot, ScanText, TrendingUp, BarChart3, Cable } from 'lucide-react';

export const SERVICE_IMAGES = {
  workflow: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=1600',
  chatbots: 'https://images.unsplash.com/photo-1677442d019cecf3917edc865ec48aaf?auto=format&fit=crop&q=80&w=1600',
  documents: 'https://images.unsplash.com/photo-1557821552-17105176677c?auto=format&fit=crop&q=80&w=1600',
  crm: 'https://images.unsplash.com/photo-1460925895917-adf4e565db6d?auto=format&fit=crop&q=80&w=1600',
  reporting: 'https://images.unsplash.com/photo-1661956600684-978bb3e7a02f?auto=format&fit=crop&q=80&w=1600',
  integrations: 'https://images.unsplash.com/photo-1633356122544-f134324ef6db?auto=format&fit=crop&q=80&w=1600',
};

export const services = [
  {
    id: 'workflow-automation',
    title: 'Workflow Automation',
    icon: Workflow,
    tile: 'bg-brand-50 text-brand-600',
    image: SERVICE_IMAGES.workflow,
    description: 'End-to-end automation using Make, Zapier, and n8n. We connect your apps and eliminate repetitive manual tasks across your entire operation.',
    intro: 'Your tools already hold the data — they just don’t talk to each other. We map every repetitive process in your operation and rebuild it as an automated workflow that runs itself, 24/7, without a human babysitting it.',
    points: [
      'Multi-step workflows built in Make, Zapier, or n8n',
      'Reliable app-to-app syncing with error handling & alerts',
      'Documented, maintainable automations your team actually owns',
    ],
    outcome: 'Reclaim the hours your team loses to copy-paste and manual hand-offs.',
  },
  {
    id: 'ai-chatbots-agents',
    title: 'AI Chatbots & Agents',
    icon: Bot,
    tile: 'bg-brand-100 text-brand-600',
    image: SERVICE_IMAGES.chatbots,
    description: 'Custom-trained AI assistants for customer support, internal knowledge bases, lead qualification, and 24/7 client communication.',
    intro: 'We build AI agents trained on your data and your voice — not a generic bot. They answer routine questions, qualify leads, and route the complex stuff to a human with full context attached.',
    points: [
      'Support & knowledge-base agents trained on your docs',
      'Lead qualification and 24/7 first-response coverage',
      'Human hand-off with full conversation context',
    ],
    outcome: 'Every message answered instantly — no queue, no missed enquiry.',
  },
  {
    id: 'document-intelligence',
    title: 'Document Intelligence',
    icon: ScanText,
    tile: 'bg-brand-100 text-brand-600',
    image: SERVICE_IMAGES.documents,
    description: 'AI that reads, extracts, and routes data from invoices, contracts, emails, and forms — zero manual data entry.',
    intro: 'Invoices, contracts, forms, inbound email — we deploy AI that reads unstructured documents, extracts exactly the fields you care about, and pushes clean data straight into your systems.',
    points: [
      'Extraction from invoices, contracts, forms & email',
      'Validation rules to catch errors before they land',
      'Clean data routed straight into your tools',
    ],
    outcome: 'Zero manual data entry — and far fewer costly mistakes.',
  },
  {
    id: 'crm-sales-automation',
    title: 'CRM & Sales Automation',
    icon: TrendingUp,
    tile: 'bg-brand-100 text-brand-600',
    image: SERVICE_IMAGES.crm,
    description: 'Auto-enrich leads, trigger follow-up sequences, sync data across HubSpot, Salesforce, and Pipedrive — no missed opportunities.',
    intro: 'We wire your CRM so leads enrich themselves, follow-ups fire on time, and data stays in sync across every tool your revenue team touches — so nothing slips through the cracks.',
    points: [
      'Automatic lead enrichment & scoring',
      'Triggered follow-up sequences that never forget',
      'Two-way sync across HubSpot, Salesforce & Pipedrive',
    ],
    outcome: 'No missed opportunities and a pipeline that updates itself.',
  },
  {
    id: 'reporting-analytics',
    title: 'Reporting & Analytics',
    icon: BarChart3,
    tile: 'bg-cyan-100 text-cyan-600',
    image: SERVICE_IMAGES.reporting,
    description: 'Automated dashboards that pull from every tool you use — live, accurate, and in front of you without lifting a finger.',
    intro: 'Stop stitching spreadsheets together every Monday. We build live dashboards that pull from every tool you use and update themselves — so the numbers are always current and always trusted.',
    points: [
      'Live dashboards aggregated from all your sources',
      'Scheduled reports delivered to inboxes or Slack',
      'One source of truth your whole team can rely on',
    ],
    outcome: 'Accurate reporting in front of you — without lifting a finger.',
  },
  {
    id: 'custom-integrations',
    title: 'Custom Integrations',
    icon: Cable,
    tile: 'bg-slate-100 text-slate-700',
    image: SERVICE_IMAGES.integrations,
    description: "When off-the-shelf tools won't cut it — we build bespoke API integrations that make your unique tech stack talk to itself.",
    intro: 'Some stacks are too specific for off-the-shelf connectors. When that’s you, we build bespoke API integrations that make your unique set of tools behave like one connected system.',
    points: [
      'Bespoke API integrations for niche or legacy tools',
      'Secure auth, retries & monitoring built in',
      'Built to your exact workflows — not a template',
    ],
    outcome: 'Your unique tech stack, finally talking to itself.',
  },
];

export const getService = (id) => services.find((s) => s.id === id) || services[0];
