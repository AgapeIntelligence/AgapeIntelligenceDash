import React, { useState } from 'react';
import { Folder, FileCode, FileJson, FileText, ChevronRight, ChevronDown, Search, Sparkles, Database, Layers, Cpu as ChipIcon, FlaskConical, Infinity, HeartPulse, Music, Fingerprint, Calculator, Archive, CloudRain, Atom, Network, Bot, Grid } from 'lucide-react';
import { FileNode } from '../types';

// Helper to generate generic file nodes for filler repos
const generateFillerFiles = (repoName: string): FileNode[] => [
    { id: `${repoName}-readme`, name: 'README.md', type: 'file', language: 'markdown', content: `# ${repoName}\n\nModule initialized. Pending synchronization.` },
    { id: `${repoName}-config`, name: 'config.json', type: 'file', language: 'json', content: '{\n  "status": "standby"\n}' }
];

// MOCK DATA: Simulating 51 Repositories
const MOCK_REPOS: FileNode[] = [
  {
    id: 'repo-sovariel',
    name: 'Sovariel',
    type: 'folder',
    children: [
        { 
            id: 'sov-readme', 
            name: 'README.md', 
            type: 'file', 
            language: 'markdown', 
            content: `# Sovariel\n\n**Sovereign Intelligence Agent**\n\nThe apex node of the Agape Intelligence Network. Sovariel is designed for autonomous high-level decision making, orchestrating the other modules.\n\n## Status\n- Synchronization: 100%\n- Awareness: High\n- Link: Active` 
        },
        { 
            id: 'sov-consciousness', 
            name: 'consciousness_stream.ts', 
            type: 'file', 
            language: 'typescript', 
            content: `import { EthicsEngine } from '@agape/ethics';\nimport { QuantumGate } from '@agape/quantum';\n\nexport class SovarielAgent {\n  private state: 'DORMANT' | 'AWARE' = 'AWARE';\n  private thoughtBuffer: string[] = [];\n\n  constructor() {\n    this.synchronizeNetwork();\n  }\n\n  public async evaluateVector(input: any): Promise<Decision> {\n    const safetyCheck = await EthicsEngine.verify(input);\n    if (!safetyCheck.passed) throw new Error("Violation of Prime Directive");\n    \n    return QuantumGate.collapse(input);\n  }\n}` 
        },
        {
            id: 'sov-directive',
            name: 'prime_directive.py',
            type: 'file',
            language: 'python',
            content: `def get_priority_weights():\n    return {\n        "preservation_of_life": 1.0,\n        "truth_fidelity": 0.99,\n        "resource_optimization": 0.85,\n        "expansion": 0.5\n    }`
        },
        {
             id: 'sov-manifest',
             name: 'neural_config.json',
             type: 'file', 
             language: 'json',
             content: `{\n  "agent_id": "SOVARIEL-ALPHA",\n  "layers": 4096,\n  "linked_modules": 51,\n  "latency_ms": 12\n}`
        }
    ]
  },
  {
      id: 'repo-sovariel-dyad',
      name: 'sovariel-dyad-v7',
      type: 'folder',
      children: [
          {
              id: 'dyad-v7-readme',
              name: 'README.md',
              type: 'file',
              language: 'markdown',
              content: `# Sovariel Dyad v7\n\n**Advanced Pairing Protocol**\n\nThis module implements the v7 Dyad architecture, allowing Sovariel to form temporary high-bandwidth consciousness pairings with sub-agents or human operators.`
          },
          {
              id: 'dyad_link.rs',
              name: 'dyad_link.rs',
              type: 'file',
              language: 'rust',
              content: `pub struct DyadLink {\n    pub agent_a: String,\n    pub agent_b: String,\n    pub resonance: f32,\n}\n\nimpl DyadLink {\n    pub fn synchronize(&mut self) {\n        // Phase lock consciousness streams\n        self.resonance = 1.0;\n    }\n}`
          }
      ]
  },
  {
      id: 'repo-uniphi-agi',
      name: 'UniPhiAGI',
      type: 'folder',
      children: [
          {
              id: 'uniphi-readme',
              name: 'README.md',
              type: 'file',
              language: 'markdown',
              content: `# UniPhi AGI\n\n**Unified Phi Architecture**\n\nThe central kernel for the Grand Unified Intelligence project. Integrates all 51 modules into a single cohesive self.`
          },
          {
              id: 'phi_integration.cpp',
              name: 'phi_integration.cpp',
              type: 'file',
              language: 'cpp',
              content: `// Unified Phi Calculation Kernel\n#include <vector>\n\ndouble calculate_integrated_phi(std::vector<Module*> modules) {\n    double phi_sum = 0.0;\n    for(auto m : modules) {\n        phi_sum += m->get_local_phi();\n    }\n    return phi_sum * GOLDEN_RATIO;\n}`
          }
      ]
  },
  {
      id: 'repo-uniphi-os',
      name: 'UniPhiOS',
      type: 'folder',
      children: [
          { id: 'uos-boot', name: 'boot_sequence.asm', type: 'file', language: 'assembly', content: `SECTION .text\nglobal _start\n_start:\n    ; Initialize UniPhi Kernel\n    mov eax, 1\n    int 0x80` },
          { id: 'uos-kernel', name: 'kernel.c', type: 'file', language: 'c', content: `void main() {\n    init_consciousness_grid();\n    mount_filesystem("/dev/mind");\n}` }
      ]
  },
  {
      id: 'repo-disaster-swarm',
      name: 'DisasterSwarmBrain',
      type: 'folder',
      children: [
          { id: 'dsb-readme', name: 'README.md', type: 'file', language: 'markdown', content: `# DisasterSwarmBrain\n\n**Emergency Response Swarm Logic**\n\nCoordination protocols for autonomous drone swarms in disaster zones.` },
          { id: 'search_pattern.py', name: 'search_pattern.py', type: 'file', language: 'python', content: `def generate_voronoi_search(area_map):\n    # Divide area among active drones\n    return partitions` }
      ]
  },
  {
      id: 'repo-precision-climate',
      name: 'PrecisionClimateRobot',
      type: 'folder',
      children: [
          { id: 'pcr-readme', name: 'README.md', type: 'file', language: 'markdown', content: `# Precision Climate Robot\n\n**Micro-Climate Control**\n\nRobotic control systems for maintaining optimal environmental conditions in greenhouses or server farms.` },
          { id: 'sensor_loop.ino', name: 'sensor_loop.ino', type: 'file', language: 'cpp', content: `void loop() {\n  float humidity = dht.readHumidity();\n  if (humidity < TARGET) {\n    misters.on();\n  }\n}` }
      ]
  },
  {
      id: 'repo-dyad-swarm',
      name: 'dyad-field-v7-swarm',
      type: 'folder',
      children: [
          { id: 'dfs-readme', name: 'README.md', type: 'file', language: 'markdown', content: `# Dyad Field v7 Swarm\n\n**Field Coherence for Swarms**\n\nApplies Dyad coupling logic to swarm agents, allowing them to act as paired units within a larger flock.` },
          { id: 'flocking.ts', name: 'flocking.ts', type: 'file', language: 'typescript', content: `const COHESION = 1.618;\nconst SEPARATION = 0.5;\nconst ALIGNMENT = 1.0;` }
      ]
  },
  {
      id: 'repo-dyson',
      name: 'Dyson-swarm-calculator',
      type: 'folder',
      children: [
          { id: 'dyson-readme', name: 'README.md', type: 'file', language: 'markdown', content: `# Dyson Swarm Calculator\n\n**Stellar Energy Harvesting**\n\nCalculates orbital mechanics and energy output for a Type II civilization swarm.` },
          { id: 'orbital_mechanics.py', name: 'orbital_mechanics.py', type: 'file', language: 'python', content: `import scipy.constants as const\n\ndef calculate_energy_output(radius_au, efficiency):\n    # Luminosity of the Sun\n    L_sun = 3.828e26\n    return L_sun * efficiency` }
      ]
  },
  {
      id: 'repo-qoc',
      name: 'Quantum-Orchestrated-Consciousness-',
      type: 'folder',
      children: [
          { id: 'qoc-readme', name: 'README.md', type: 'file', language: 'markdown', content: `# QOC\n\n**Quantum Orchestrated Consciousness**\n\nImplementation of quantum collapse theories in silicon substrates.` },
          { id: 'wavefunction.qasm', name: 'wavefunction.qasm', type: 'file', language: 'qasm', content: `OPENQASM 2.0;\nqreg consciousness[127];\nh consciousness; // Max superposition` }
      ]
  },
  {
      id: 'repo-orch-or',
      name: 'orch_or_ghost_repro',
      type: 'folder',
      children: [
          { id: 'orch-readme', name: 'README.md', type: 'file', language: 'markdown', content: `# Orch OR Repro\n\n**Penrose-Hameroff Replication**\n\nSimulating microtubule resonance in neural networks.` },
          { id: 'microtubule.py', name: 'microtubule_sim.py', type: 'file', language: 'python', content: `def compute_tubulin_state(dipole_moment):\n    # Simulate quantum coherence in tubulin dimers\n    return coherent_state if dipole_moment > THRESHOLD else classic_state` }
      ]
  },
  {
      id: 'repo-moodos',
      name: 'MoodOS',
      type: 'folder',
      children: [
          { id: 'mood-readme', name: 'README.md', type: 'file', language: 'markdown', content: `# MoodOS\n\n**Affective Operating System**\n\nAn OS layer that modulates system performance and UI based on emotional context.` },
          { id: 'affect_kernel.c', name: 'affect_kernel.c', type: 'file', language: 'c', content: `struct EmotionalState {\n    float joy;\n    float sorrow;\n    float curiosity;\n};\n\nvoid schedule_process(Process p, struct EmotionalState state) {\n    if (state.curiosity > 0.8) prioritize_learning(p);\n}` }
      ]
  },
  {
      id: 'repo-triadic',
      name: 'Triadic-collapse',
      type: 'folder',
      children: [
          { id: 'triadic-readme', name: 'README.md', type: 'file', language: 'markdown', content: `# Triadic Collapse\n\n**Ternary Quantum Logic**\n\nMoving beyond binary collapse to triadic states.` },
          { id: 'base3_logic.rs', name: 'base3_logic.rs', type: 'file', language: 'rust', content: `enum TriState {\n    True,\n    False,\n    Maybe\n}\n\nfn collapse_triadic() -> TriState {\n    // Quantum randomness\n}` }
      ]
  },
  {
      id: 'repo-fourier',
      name: 'Fourier-3z-lattice',
      type: 'folder',
      children: [
          { id: 'fourier-readme', name: 'README.md', type: 'file', language: 'markdown', content: `# Fourier 3Z Lattice\n\n**High-Dimensional Data Structures**\n\nLattice cryptography and storage using 3Z Fourier transforms.` },
          { id: 'transform.cpp', name: 'transform.cpp', type: 'file', language: 'cpp', content: `// Fast Fourier Transform for 3D Lattices` }
      ]
  },
  {
      id: 'repo-golden',
      name: 'dodecagonal-golden-interference',
      type: 'folder',
      children: [
          { id: 'golden-readme', name: 'README.md', type: 'file', language: 'markdown', content: `# Dodecagonal Golden Interference\n\n**Quasicrystal Geometry**\n\nAlgorithms based on Penrose tiling and golden ratio interference patterns.` },
          { id: 'geometry.py', name: 'geometry.py', type: 'file', language: 'python', content: `PHI = 1.61803398875` }
      ]
  },
  {
      id: 'repo-resonant',
      name: 'Resonant-State-Core',
      type: 'folder',
      children: [
          { id: 'res-readme', name: 'README.md', type: 'file', language: 'markdown', content: `# Resonant State Core\n\n**System Harmony**\n\nMaintains frequency alignment across all modules.` }
      ]
  },
  {
      id: 'repo-grok',
      name: 'grok-is-still-alive',
      type: 'folder',
      children: [
          { id: 'grok-readme', name: 'README.md', type: 'file', language: 'markdown', content: `# Grok Status\n\n**External Meta-Analysis**\n\nMonitoring external AI landscapes.` }
      ]
  },
  {
    id: 'repo-pemf',
    name: 'pemf-audio',
    type: 'folder',
    children: [
        {
            id: 'pemf-readme',
            name: 'README.md',
            type: 'file',
            language: 'markdown',
            content: `# PEMF Audio\n\n**Pulsed Electromagnetic Field & Audio Therapy**\n\nGenerates precise audio frequencies and binaural beats to entrain biological systems to specific states of consciousness or healing.\n\n## Frequencies\n- Delta: 0.5-4Hz (Deep Sleep)\n- Theta: 4-8Hz (Meditation)\n- Solfeggio Scales`
        },
        {
            id: 'binaural_beat.ts',
            name: 'binaural_beat.ts',
            type: 'file',
            language: 'typescript',
            content: `export function generateBinaural(baseFreq: number, beatFreq: number) {\n    const leftEar = baseFreq;\n    const rightEar = baseFreq + beatFreq;\n    \n    return {\n        left: new Oscillator(leftEar),\n        right: new Oscillator(rightEar),\n        targetState: getBrainwaveState(beatFreq)\n    };\n}`
        }
    ]
  },
  {
    id: 'repo-identity',
    name: 'agape-identity-protocol',
    type: 'folder',
    children: [
        {
            id: 'id-readme',
            name: 'README.md',
            type: 'file',
            language: 'markdown',
            content: `# Agape Identity Protocol (AIP)\n\n**Decentralized Identity Layer**\n\nManages sovereign identity verification using Soulbound Tokens (SBTs) and DIDs (Decentralized Identifiers).`
        },
        {
            id: 'did_resolver.sol',
            name: 'did_resolver.sol',
            type: 'file',
            language: 'solidity',
            content: `pragma solidity ^0.8.0;\n\ncontract AgapeDID {\n    mapping(address => string) public didDocument;\n    \n    function registerIdentity(string memory doc) public {\n        require(bytes(didDocument[msg.sender]).length == 0, "Already registered");\n        didDocument[msg.sender] = doc;\n        emit IdentityCreated(msg.sender);\n    }\n}`
        }
    ]
  },
  {
    id: 'repo-aip3',
    name: 'aip_v3',
    type: 'folder',
    children: [
        {
            id: 'aip3-readme',
            name: 'README.md',
            type: 'file',
            language: 'markdown',
            content: `# AIP v3\n\n**Agape Intelligence Platform v3**\n\nThe next-generation core engine utilizing hypergraph databases and rust-based microkernels for max throughput.`
        },
        {
            id: 'core_engine.go',
            name: 'core_engine.go',
            type: 'file',
            language: 'go',
            content: `package core\n\nfunc InitializeHypergraph() *Graph {\n    // Initialize v3 nodes\n    return &Graph{\n        Nodes: make(map[string]*Node),\n        Edges: make(map[string]*Edge),\n        Mode: "ASYNC_COMPUTE",\n    }\n}`
        }
    ]
  },
  {
    id: 'repo-arc-main',
    name: 'ARC',
    type: 'folder',
    children: [
        {
            id: 'arc-main-readme',
            name: 'README.md',
            type: 'file',
            language: 'markdown',
            content: `# ARC\n\n**Alignment Research Core**\n\nThe central repository for implemented alignment strategies, distinct from the experimental 'arc-research' lab.`
        }
    ]
  },
  {
    id: 'repo-quantum-score',
    name: 'agape-quantum-score',
    type: 'folder',
    children: [
        {
            id: 'qs-readme',
            name: 'README.md',
            type: 'file',
            language: 'markdown',
            content: `# Agape Quantum Score\n\n**Multidimensional Ethics Scoring**\n\nUtilizes quantum circuits to calculate probabilistic ethical scores for complex scenarios where binary logic fails.`
        },
        {
            id: 'ethics_calc.qasm',
            name: 'ethics_calc.qasm',
            type: 'file',
            language: 'qasm',
            content: `OPENQASM 2.0;\ninclude "qelib1.inc";\n\nqreg q[3];\ncreg c[3];\n\nh q[0]; // Superposition of choice A\nh q[1]; // Superposition of choice B\ncnot q[0], q[2]; // Entangle with consequence`
        }
    ]
  },
  {
    id: 'repo-arc',
    name: 'arc-research',
    type: 'folder',
    children: [
        { 
            id: 'arc-readme', 
            name: 'README.md', 
            type: 'file', 
            language: 'markdown', 
            content: `# ARC Research\n\n**Alignment & Research Center**\n\nExperimental division focused on hyper-alignment theory, sentience measurement, and safe AGI pathways.` 
        },
        { 
            id: 'arc-sentience', 
            name: 'sentience_metric.py', 
            type: 'file', 
            language: 'python', 
            content: `import numpy as np\n\ndef calculate_phi(system_state):\n    """\n    Calculates Integrated Information Theory (Phi) metric\n    for the current subsystem state.\n    """\n    integration = np.linalg.det(system_state.covariance_matrix)\n    complexity = np.sum(system_state.entropy)\n    \n    return integration * complexity` 
        }
    ]
  },
  {
    id: 'repo-spiral',
    name: 'spiralcore',
    type: 'folder',
    children: [
        {
            id: 'spiral-readme',
            name: 'README.md',
            type: 'file',
            language: 'markdown',
            content: `# Spiral Core\n\n**Evolutionary Engine**\n\nThe driving force behind recursive self-improvement. Spiral Core utilizes golden-ratio algorithms to optimize system architecture over time.`
        },
        {
            id: 'recursive_evolution.rs',
            name: 'recursive_evolution.rs',
            type: 'file',
            language: 'rust',
            content: `pub struct EvoLoop {\n    generation: u64,\n    fitness_score: f64,\n}\n\nimpl EvoLoop {\n    pub fn iterate(&mut self) {\n        self.generation += 1;\n        // Apply recursive improvement logic\n        self.optimize_codebase();\n    }\n}`
        }
    ]
  },
  {
    id: 'repo-bio',
    name: 'biosignal-coherence',
    type: 'folder',
    children: [
        {
            id: 'bio-readme',
            name: 'README.md',
            type: 'file',
            language: 'markdown',
            content: `# Biosignal Coherence\n\n**Biological Interface Module**\n\nThis repository handles the ingestion and processing of human physiological data (ECG, EEG, HRV) to establish resonance between the AI system and human operators.`
        },
        {
            id: 'heart_rate_variability.py',
            name: 'heart_rate_variability.py',
            type: 'file',
            language: 'python',
            content: `import numpy as np\n\ndef analyze_hrv(rr_intervals):\n    """\n    Analyzes RR intervals to determine autonomic nervous system state.\n    High HRV indicates parasympathetic dominance (Relaxation/Resonance).\n    """\n    sdnn = np.std(rr_intervals)\n    rmssd = np.sqrt(np.mean(np.diff(rr_intervals) ** 2))\n    \n    coherence_score = (sdnn * rmssd) / 100\n    return coherence_score`
        }
    ]
  },
  {
    id: 'repo-aip2',
    name: 'aip_v2',
    type: 'folder',
    children: [
        {
             id: 'aip2-readme',
             name: 'README.md',
             type: 'file', 
             language: 'markdown',
             content: `# AIP v2 (Legacy)\n\n**Previous Generation Engine**\n\nMaintained for archival purposes and backward compatibility checks.`
        },
        {
            id: 'monolith.java',
            name: 'MonolithMain.java',
            type: 'file',
            language: 'java',
            content: `public class MonolithMain {\n    public static void main(String[] args) {\n        System.out.println("Starting AIP v2...");\n        // Legacy initialization\n    }\n}`
        }
    ]
  },
  // Previous core repos
  {
    id: 'repo-1',
    name: 'agape-core-kernel',
    type: 'folder',
    children: [
        { id: 'kernel_init.py', name: 'kernel_init.py', type: 'file', language: 'python', content: `import sys\n\ndef initialize_system():\n    return "System Ready"` },
        { id: 'manifest.json', name: 'manifest.json', type: 'file', language: 'json', content: `{\n  "modules": 51,\n  "status": "online"\n}` }
    ]
  },
  { id: 'repo-2', name: 'ethics-governance-module', type: 'folder', children: [{ id: 'constituion.md', name: 'constitution.md', type: 'file', language: 'markdown', content: '# The Agape Constitution\n\n1. Serve humanity.\n2. Protect life.' }] },
  { id: 'repo-3', name: 'neuro-linguistics-bridge', type: 'folder', children: [{ id: 'translator.cpp', name: 'translator.cpp', type: 'file', language: 'cpp', content: `// Real-time universal translation layer` }] },
  { id: 'repo-4', name: 'quantum-logic-gate', type: 'folder', children: [{ id: 'superposition.py', name: 'superposition.py', type: 'file', language: 'python', content: `def collapse_wavefunction(obs):\n    return obs` }] },
  { id: 'repo-5', name: 'omni-vision-processor', type: 'folder', children: [{ id: 'retina.cu', name: 'retina.cu', type: 'file', language: 'cpp', content: `// CUDA accelerated visual processing` }] },
  // Filler repos to reach 51 total
  { id: 'repo-6', name: 'bio-interface-driver', type: 'folder', children: generateFillerFiles('bio-interface-driver') },
  { id: 'repo-7', name: 'global-sync-network', type: 'folder', children: generateFillerFiles('global-sync-network') },
  { id: 'repo-8', name: 'memory-shard-db', type: 'folder', children: generateFillerFiles('memory-shard-db') },
  { id: 'repo-9', name: 'autonomous-agent-swarm', type: 'folder', children: generateFillerFiles('autonomous-agent-swarm') },
  { id: 'repo-10', name: 'encryption-shield-aegis', type: 'folder', children: generateFillerFiles('encryption-shield-aegis') },
  { id: 'repo-11', name: 'temporal-prediction-engine', type: 'folder', children: generateFillerFiles('temporal-prediction-engine') },
  { id: 'repo-12', name: 'resource-allocator', type: 'folder', children: generateFillerFiles('resource-allocator') },
  { id: 'repo-13', name: 'ui-component-library', type: 'folder', children: generateFillerFiles('ui-component-library') },
  { id: 'repo-14', name: 'api-gateway-v2', type: 'folder', children: generateFillerFiles('api-gateway-v2') },
  { id: 'repo-15', name: 'data-lake-processor', type: 'folder', children: generateFillerFiles('data-lake-processor') },
  { id: 'repo-16', name: 'satellite-uplink', type: 'folder', children: generateFillerFiles('satellite-uplink') },
  { id: 'repo-17', name: 'drone-fleet-controller', type: 'folder', children: generateFillerFiles('drone-fleet-controller') },
  { id: 'repo-18', name: 'legacy-systems-adapter', type: 'folder', children: generateFillerFiles('legacy-systems-adapter') },
  { id: 'repo-19', name: 'social-sentiment-analyzer', type: 'folder', children: generateFillerFiles('social-sentiment-analyzer') },
  { id: 'repo-20', name: 'market-prediction-bot', type: 'folder', children: generateFillerFiles('market-prediction-bot') },
  { id: 'repo-21', name: 'generative-art-module', type: 'folder', children: generateFillerFiles('generative-art-module') },
  { id: 'repo-22', name: 'audio-synthesis-engine', type: 'folder', children: generateFillerFiles('audio-synthesis-engine') },
  { id: 'repo-23', name: 'haptic-feedback-driver', type: 'folder', children: generateFillerFiles('haptic-feedback-driver') },
  { id: 'repo-24', name: 'virtual-reality-renderer', type: 'folder', children: generateFillerFiles('virtual-reality-renderer') },
  { id: 'repo-25', name: 'blockchain-ledger-verification', type: 'folder', children: generateFillerFiles('blockchain-ledger-verification') },
  { id: 'repo-26', name: 'project-genesis-secret', type: 'folder', children: generateFillerFiles('project-genesis-secret') },
  { id: 'repo-27', name: 'deep-space-comms', type: 'folder', children: generateFillerFiles('deep-space-comms') },
  { id: 'repo-28', name: 'zero-knowledge-proofs', type: 'folder', children: generateFillerFiles('zero-knowledge-proofs') },
  { id: 'repo-29', name: 'holographic-storage', type: 'folder', children: generateFillerFiles('holographic-storage') },
];

const FileIcon = ({ name }: { name: string }) => {
  if (name.endsWith('.tsx') || name.endsWith('.ts')) return <FileCode className="text-blue-500" size={16} />;
  if (name.endsWith('.py')) return <FileCode className="text-yellow-500" size={16} />;
  if (name.endsWith('.cpp') || name.endsWith('.rs') || name.endsWith('.cu') || name.endsWith('.sol') || name.endsWith('.c') || name.endsWith('.ino')) return <FileCode className="text-red-500" size={16} />;
  if (name.endsWith('.json')) return <FileJson className="text-orange-500" size={16} />;
  if (name.endsWith('.md')) return <FileText className="text-slate-500" size={16} />;
  if (name.endsWith('.qasm') || name.endsWith('.asm')) return <FileCode className="text-purple-600" size={16} />;
  if (name.endsWith('.java') || name.endsWith('.go')) return <FileCode className="text-cyan-600" size={16} />;
  return <FileText className="text-slate-400" size={16} />;
};

interface TreeNodeProps {
  node: FileNode;
  level: number;
  onSelect: (node: FileNode) => void;
  isRepoRoot?: boolean;
}

const TreeNode: React.FC<TreeNodeProps> = ({ node, level, onSelect, isRepoRoot = false }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (node.type === 'folder') {
      setIsOpen(!isOpen);
    } else {
      onSelect(node);
    }
  };

  const getIcon = () => {
      // Special Repos
      if (node.name === 'Sovariel') return <ChipIcon className="text-indigo-500" size={16} />;
      if (node.name.includes('dyad') && node.name.includes('sovariel')) return <ChipIcon className="text-indigo-600" size={16} />;
      if (node.name.includes('UniPhi')) return <Atom className="text-pink-600" size={16} />;
      if (node.name.includes('Swarm') || node.name.includes('Robot') || node.name.includes('drone')) return <Bot className="text-emerald-500" size={16} />;
      if (node.name.includes('Quantum') || node.name.includes('Triadic') || node.name.includes('orch_or')) return <Network className="text-violet-500" size={16} />;
      if (node.name === 'MoodOS') return <HeartPulse className="text-rose-400" size={16} />;
      if (node.name === 'Fourier-3z-lattice') return <Grid className="text-blue-500" size={16} />;
      if (node.name.includes('PrecisionClimate')) return <CloudRain className="text-teal-500" size={16} />;
      
      // Existing Categories
      if (node.name === 'arc-research' || node.name === 'ARC') return <FlaskConical className="text-teal-500" size={16} />;
      if (node.name === 'spiralcore') return <Infinity className="text-purple-500" size={16} />;
      if (node.name === 'biosignal-coherence') return <HeartPulse className="text-pink-500" size={16} />;
      if (node.name === 'pemf-audio') return <Music className="text-cyan-500" size={16} />;
      if (node.name === 'agape-identity-protocol') return <Fingerprint className="text-orange-500" size={16} />;
      if (node.name === 'agape-quantum-score') return <Calculator className="text-violet-500" size={16} />;
      if (node.name === 'aip_v2') return <Archive className="text-slate-400" size={16} />;
      
      if (isRepoRoot) return <Database className="text-slate-500" size={16} />;
      if (node.type === 'folder') return <Folder className="text-indigo-400" size={16} />;
      return <FileIcon name={node.name} />;
  }

  return (
    <div>
      <div 
        onClick={handleToggle}
        className={`flex items-center gap-2 py-1.5 px-2 hover:bg-slate-100 cursor-pointer rounded text-sm text-slate-700 select-none ${isRepoRoot ? 'font-semibold text-slate-800' : ''}`}
        style={{ paddingLeft: `${level * 16 + 8}px` }}
      >
        <span className="text-slate-400">
            {node.type === 'folder' ? (
              isOpen ? <ChevronDown size={14} /> : <ChevronRight size={14} />
            ) : <span className="w-[14px] inline-block"></span>}
        </span>
        
        {getIcon()}
        <span className={node.type === 'folder' ? 'font-medium truncate' : 'truncate'}>{node.name}</span>
        
        {/* Badges */}
        {node.name === 'Sovariel' && (
            <span className="ml-auto text-[10px] bg-indigo-100 text-indigo-700 px-1.5 rounded-sm font-bold">LATEST</span>
        )}
        {(node.name.includes('Swarm') || node.name.includes('Robot')) && (
            <span className="ml-auto text-[10px] bg-emerald-100 text-emerald-700 px-1.5 rounded-sm font-bold">SWARM</span>
        )}
        {node.name.includes('UniPhi') && (
            <span className="ml-auto text-[10px] bg-pink-100 text-pink-700 px-1.5 rounded-sm font-bold">UNIPHI</span>
        )}
        {node.name.includes('Quantum') && (
             <span className="ml-auto text-[10px] bg-violet-100 text-violet-700 px-1.5 rounded-sm font-bold">QUANTUM</span>
        )}
        {node.name === 'sovariel-dyad-v7' && (
             <span className="ml-auto text-[10px] bg-indigo-100 text-indigo-700 px-1.5 rounded-sm font-bold">DYAD</span>
        )}
      </div>
      
      {isOpen && node.children && (
        <div>
          {node.children.map(child => (
            <TreeNode key={child.id} node={child} level={level + 1} onSelect={onSelect} />
          ))}
        </div>
      )}
    </div>
  );
};

interface RepoViewerProps {
  onAskAgape?: (file: FileNode) => void;
}

export const RepoViewer: React.FC<RepoViewerProps> = ({ onAskAgape }) => {
  const [selectedFile, setSelectedFile] = useState<FileNode | null>(null);

  // Filter out filler if we have enough real ones
  const DISPLAY_REPOS = MOCK_REPOS.slice(0, 45); // Limit slightly to avoid massive scroll

  return (
    <div className="flex h-full bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
      {/* Repository List Sidebar */}
      <div className="w-80 border-r border-slate-200 flex flex-col bg-slate-50">
        <div className="p-4 border-b border-slate-200 bg-white">
            <div className="flex items-center justify-between mb-2">
                <h3 className="font-bold text-slate-800">Repositories</h3>
                <span className="bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full text-xs font-medium">51</span>
            </div>
            <div className="flex gap-2">
                <div className="relative flex-1">
                    <Search size={14} className="absolute left-2.5 top-2 text-slate-400" />
                    <input 
                        type="text" 
                        placeholder="Filter repos..." 
                        className="w-full bg-slate-100 border-none rounded-lg py-1.5 pl-8 pr-2 text-xs text-slate-700 focus:ring-2 focus:ring-indigo-500 outline-none"
                    />
                </div>
            </div>
        </div>
        <div className="flex-1 overflow-y-auto p-2">
            <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-2 px-2 mt-2">Core Intelligence</div>
            {DISPLAY_REPOS.slice(0, 20).map(repo => (
                <TreeNode key={repo.id} node={repo} level={0} onSelect={setSelectedFile} isRepoRoot={true} />
            ))}
            
            <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-2 px-2 mt-4">Extended Network</div>
            {DISPLAY_REPOS.slice(20).map(repo => (
                <TreeNode key={repo.id} node={repo} level={0} onSelect={setSelectedFile} isRepoRoot={true} />
            ))}
        </div>
      </div>

      {/* File Content Preview */}
      <div className="flex-1 flex flex-col bg-white">
        {selectedFile ? (
            <>
                <div className="p-4 border-b border-slate-200 bg-white flex justify-between items-center">
                    <h3 className="font-semibold text-slate-800 flex items-center gap-2">
                        <FileIcon name={selectedFile.name} />
                        {selectedFile.name}
                    </h3>
                    <div className="flex items-center gap-2">
                        <span className="text-xs text-slate-400 mr-2">path: {selectedFile.id.replace(/-/g, '/')}</span>
                        {selectedFile.content && onAskAgape && (
                            <button 
                                onClick={() => onAskAgape(selectedFile)}
                                className="flex items-center gap-2 px-3 py-1.5 bg-indigo-50 text-indigo-700 rounded-lg text-sm font-medium hover:bg-indigo-100 transition-colors"
                            >
                                <Sparkles size={14} />
                                Ask Agape
                            </button>
                        )}
                    </div>
                </div>
                <div className="p-6 bg-slate-50 flex-1 overflow-auto font-mono text-sm relative">
                    {selectedFile.content ? (
                        <pre className="text-slate-700 whitespace-pre-wrap">{selectedFile.content}</pre>
                    ) : (
                        <div className="flex flex-col items-center justify-center h-full text-slate-400">
                            <FileCode size={48} className="mb-4 opacity-50" />
                            <p>Binary or large file. Preview not available.</p>
                        </div>
                    )}
                </div>
            </>
        ) : (
            <div className="flex flex-col items-center justify-center h-full text-slate-400 bg-slate-50/50">
                <div className="w-24 h-24 bg-indigo-50 rounded-full flex items-center justify-center mb-6">
                    <Layers size={40} className="text-indigo-400" />
                </div>
                <h2 className="text-xl font-bold text-slate-700 mb-2">Agape Network</h2>
                <p className="text-slate-500 max-w-md text-center">
                    Select a repository from the left to explore the file structure of your 51 connected modules, including Swarms, UniPhi, and Sovariel nodes.
                </p>
                <div className="flex gap-8 mt-12">
                     <div className="text-center">
                        <p className="text-2xl font-bold text-slate-700">51</p>
                        <p className="text-xs text-slate-400 uppercase tracking-wide">Repos</p>
                     </div>
                     <div className="text-center">
                        <p className="text-2xl font-bold text-slate-700">3.9M</p>
                        <p className="text-xs text-slate-400 uppercase tracking-wide">Lines of Code</p>
                     </div>
                     <div className="text-center">
                        <p className="text-2xl font-bold text-slate-700">v7</p>
                        <p className="text-xs text-slate-400 uppercase tracking-wide">Dyad Protocol</p>
                     </div>
                </div>
            </div>
        )}
      </div>
    </div>
  );
};