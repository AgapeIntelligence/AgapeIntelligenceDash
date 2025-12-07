import React, { useState } from 'react';
import { Folder, FileCode, FileJson, FileText, ChevronRight, ChevronDown, GitBranch, Download, Search, FolderTree } from 'lucide-react';
import { FileNode } from '../types';

// Mock Data for the "AgapeIntelligence" repository structure
const MOCK_REPO: FileNode = {
  id: 'root',
  name: 'AgapeIntelligence',
  type: 'folder',
  children: [
    {
      id: 'core',
      name: 'core',
      type: 'folder',
      children: [
        { id: 'ethics_engine.py', name: 'ethics_engine.py', type: 'file', language: 'python', content: 'class EthicsEngine:\n    def evaluate(self, context):\n        # Primary directive: Benevolence\n        return True' },
        { id: 'logic_processor.cpp', name: 'logic_processor.cpp', type: 'file', language: 'cpp' },
      ]
    },
    {
      id: 'models',
      name: 'models',
      type: 'folder',
      children: [
        { id: 'agape_v1.pt', name: 'agape_v1.pt', type: 'file', language: 'binary' },
        { id: 'tokenizer.json', name: 'tokenizer.json', type: 'file', language: 'json' },
      ]
    },
    {
      id: 'web',
      name: 'web',
      type: 'folder',
      children: [
        { id: 'src', name: 'src', type: 'folder', children: [
             { id: 'App.tsx', name: 'App.tsx', type: 'file', language: 'typescript' }
        ]},
        { id: 'package.json', name: 'package.json', type: 'file', language: 'json' },
      ]
    },
    { id: 'README.md', name: 'README.md', type: 'file', language: 'markdown', content: '# Agape Intelligence\n\nUnified framework for ethical artificial intelligence.' },
    { id: 'LICENSE', name: 'LICENSE', type: 'file', language: 'text' },
  ]
};

const FileIcon = ({ name }: { name: string }) => {
  if (name.endsWith('.tsx') || name.endsWith('.ts')) return <FileCode className="text-blue-500" size={16} />;
  if (name.endsWith('.py')) return <FileCode className="text-yellow-500" size={16} />;
  if (name.endsWith('.json')) return <FileJson className="text-orange-500" size={16} />;
  if (name.endsWith('.md')) return <FileText className="text-slate-500" size={16} />;
  return <FileText className="text-slate-400" size={16} />;
};

interface TreeNodeProps {
  node: FileNode;
  level: number;
  onSelect: (node: FileNode) => void;
}

const TreeNode: React.FC<TreeNodeProps> = ({ node, level, onSelect }) => {
  const [isOpen, setIsOpen] = useState(level < 1); // Open root by default

  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (node.type === 'folder') {
      setIsOpen(!isOpen);
    } else {
      onSelect(node);
    }
  };

  return (
    <div>
      <div 
        onClick={handleToggle}
        className={`flex items-center gap-2 py-1.5 px-2 hover:bg-slate-100 cursor-pointer rounded text-sm text-slate-700 select-none`}
        style={{ paddingLeft: `${level * 16 + 8}px` }}
      >
        <span className="text-slate-400">
            {node.type === 'folder' ? (
              isOpen ? <ChevronDown size={14} /> : <ChevronRight size={14} />
            ) : <span className="w-[14px] inline-block"></span>}
        </span>
        
        {node.type === 'folder' ? <Folder className="text-indigo-400" size={16} /> : <FileIcon name={node.name} />}
        <span className={node.type === 'folder' ? 'font-medium' : ''}>{node.name}</span>
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

export const RepoViewer: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<FileNode | null>(null);

  return (
    <div className="flex h-full bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
      {/* File Tree Sidebar */}
      <div className="w-1/3 border-r border-slate-200 flex flex-col bg-slate-50">
        <div className="p-4 border-b border-slate-200 flex justify-between items-center bg-white">
            <div className="flex items-center gap-2">
                <GitBranch size={16} className="text-indigo-600" />
                <span className="font-semibold text-slate-800 text-sm">main</span>
            </div>
             <div className="flex gap-2 text-slate-400">
                <Search size={16} className="cursor-pointer hover:text-indigo-600" />
                <Download size={16} className="cursor-pointer hover:text-indigo-600" />
            </div>
        </div>
        <div className="flex-1 overflow-y-auto p-2">
          <TreeNode node={MOCK_REPO} level={0} onSelect={setSelectedFile} />
        </div>
      </div>

      {/* File Content Preview */}
      <div className="flex-1 flex flex-col bg-white">
        {selectedFile ? (
            <>
                <div className="p-4 border-b border-slate-200 bg-white">
                    <h3 className="font-semibold text-slate-800 flex items-center gap-2">
                        <FileIcon name={selectedFile.name} />
                        {selectedFile.name}
                    </h3>
                </div>
                <div className="p-6 bg-slate-50 flex-1 overflow-auto font-mono text-sm">
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
            <div className="flex flex-col items-center justify-center h-full text-slate-400">
                <FolderTree size={64} className="mb-4 text-indigo-100" />
                <p className="text-lg font-medium text-slate-500">Select a file to view content</p>
                <p className="text-sm">Browse the AgapeIntelligence codebase</p>
            </div>
        )}
      </div>
    </div>
  );
};