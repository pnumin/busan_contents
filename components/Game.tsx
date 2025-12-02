import React, { useState } from 'react';
import { PROPOSALS } from '../constants';
import { RotateCw, CheckCircle2 } from 'lucide-react';
import { generateAiAdvice } from '../services/geminiService';
import ReactMarkdown from 'react-markdown';

const Game: React.FC = () => {
  // Flashcard State
  const [flippedCards, setFlippedCards] = useState<Record<number, boolean>>({});
  
  // AI Chat State
  const [chatQuery, setChatQuery] = useState('');
  const [chatResponse, setChatResponse] = useState('');
  const [isChatLoading, setIsChatLoading] = useState(false);

  const toggleFlip = (id: number) => {
    setFlippedCards(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleAiAsk = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatQuery.trim()) return;

    setIsChatLoading(true);
    const answer = await generateAiAdvice(chatQuery);
    setChatResponse(answer);
    setIsChatLoading(false);
  };

  return (
    <div className="space-y-12 animate-fade-in max-w-5xl mx-auto">
      
      {/* Game Section */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-slate-800 mb-3">부산 관광 퀴즈: 제안서 뒤집기</h2>
        <p className="text-slate-600 mb-8">카드를 클릭하여 각 제안의 핵심 <span className="text-blue-600 font-bold">액티비티</span>를 확인해보세요!</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {PROPOSALS.map((proposal) => (
            <div 
              key={proposal.id} 
              className={`relative h-80 w-full cursor-pointer card-flip-container ${flippedCards[proposal.id] ? 'flipped' : ''}`}
              onClick={() => toggleFlip(proposal.id)}
            >
              <div className="card-flip-inner shadow-lg rounded-xl">
                {/* Front Side */}
                <div className="card-front bg-white border-2 border-slate-100 flex flex-col items-center justify-center p-6 z-10 hover:border-blue-300 transition-colors">
                  <span className="text-6xl mb-4 opacity-20 font-black text-slate-900">{proposal.id}</span>
                  <h3 className="text-xl font-bold text-slate-800 mb-2">{proposal.title}</h3>
                  <p className="text-sm text-slate-500">{proposal.subtitle}</p>
                  <div className="mt-8 text-blue-500 text-sm flex items-center gap-1">
                    <RotateCw size={14} /> 클릭해서 확인하기
                  </div>
                </div>

                {/* Back Side */}
                <div className="card-back bg-gradient-to-br from-blue-500 to-indigo-600 text-white p-6 flex flex-col items-center justify-center">
                  <h4 className="font-bold text-lg mb-4 border-b border-white/30 pb-2 w-full">핵심 액티비티</h4>
                  <ul className="text-sm space-y-3 text-left w-full">
                    {proposal.activities.map((act, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-yellow-300" />
                        <span>{act.split(':')[0]}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-auto pt-4 text-xs text-blue-200">
                    타겟: {proposal.target}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* AI Chat Section */}
      <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200 mt-12">
        <h2 className="text-2xl font-bold text-slate-800 mb-4">🤖 AI 부산 관광 컨설턴트</h2>
        <p className="text-slate-600 mb-6">이번 기획서 내용이나 부산 여행에 대해 궁금한 점을 물어보세요. (Gemini 2.5 Flash 기반)</p>
        
        <form onSubmit={handleAiAsk} className="flex gap-2 mb-6">
          <input 
            type="text" 
            value={chatQuery}
            onChange={(e) => setChatQuery(e.target.value)}
            placeholder="예: 다대포 올인원 나이트가 뭐야? 혹은 부산 역사 투어 코스 추천해줘."
            className="flex-1 border border-slate-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
          />
          <button 
            type="submit" 
            disabled={isChatLoading || !chatQuery.trim()}
            className="bg-slate-900 text-white px-6 py-3 rounded-lg font-medium hover:bg-slate-800 disabled:opacity-50 transition-colors"
          >
            {isChatLoading ? '생성 중...' : '질문하기'}
          </button>
        </form>

        {chatResponse && (
          <div className="bg-slate-50 rounded-xl p-6 border border-slate-200 animate-fade-in text-left">
            <h4 className="font-bold text-slate-700 mb-4 flex items-center gap-2 border-b pb-2 border-slate-200">
              Gemini의 답변
            </h4>
            <div className="text-slate-700 text-sm md:text-base leading-relaxed">
              <ReactMarkdown
                components={{
                  strong: ({node, ...props}) => <span className="font-bold text-slate-900" {...props} />,
                  ul: ({node, ...props}) => <ul className="list-disc pl-5 space-y-2 mb-4" {...props} />,
                  ol: ({node, ...props}) => <ol className="list-decimal pl-5 space-y-2 mb-4" {...props} />,
                  li: ({node, ...props}) => <li className="pl-1" {...props} />,
                  p: ({node, ...props}) => <p className="mb-4 last:mb-0" {...props} />,
                  h1: ({node, ...props}) => <h1 className="text-xl font-bold mt-4 mb-2 text-slate-800" {...props} />,
                  h2: ({node, ...props}) => <h2 className="text-lg font-bold mt-3 mb-2 text-slate-800" {...props} />,
                  h3: ({node, ...props}) => <h3 className="text-base font-bold mt-2 mb-1 text-slate-800" {...props} />,
                  blockquote: ({node, ...props}) => <blockquote className="border-l-4 border-blue-200 pl-4 italic my-4 text-slate-600" {...props} />,
                }}
              >
                {chatResponse}
              </ReactMarkdown>
            </div>
          </div>
        )}
      </div>

    </div>
  );
};

export default Game;