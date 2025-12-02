import React, { useState } from 'react';
import { PROPOSALS } from '../constants';
import { generateProposalImage } from '../services/geminiService';
import { Sparkles, MapPin, Users, Activity, ImageIcon, Loader2 } from 'lucide-react';
import { Proposal } from '../types';

const Proposals: React.FC = () => {
  const [loadingMap, setLoadingMap] = useState<Record<number, boolean>>({});
  const [images, setImages] = useState<Record<number, string>>({});

  const handleGenerateImage = async (proposal: Proposal) => {
    setLoadingMap(prev => ({ ...prev, [proposal.id]: true }));
    
    // Construct a visual description for the prompt
    const description = `A tourism concept showing ${proposal.title}. ${proposal.course}. Key activity: ${proposal.activities[0]}. Mood: ${proposal.subtitle}`;
    
    const imageUrl = await generateProposalImage(proposal.title, description);
    
    if (imageUrl) {
      setImages(prev => ({ ...prev, [proposal.id]: imageUrl }));
    } else {
      alert("이미지 생성에 실패했습니다. API 키를 확인해주세요.");
    }
    
    setLoadingMap(prev => ({ ...prev, [proposal.id]: false }));
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-slate-800">4대 신규 콘텐츠 제안 (New Content Proposals)</h2>
        <p className="text-slate-600 mt-2">댓글 분석을 통해 입증된 <span className="font-semibold">다대포의 잠재력</span>과 <span className="font-semibold">역사/자연 확장성</span>을 테마로 합니다.</p>
      </div>

      <div className="grid grid-cols-1 gap-10">
        {PROPOSALS.map((proposal) => (
          <div key={proposal.id} className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden flex flex-col lg:flex-row transition-shadow hover:shadow-md">
            
            {/* Visual Section */}
            <div className="lg:w-2/5 bg-slate-100 relative min-h-[300px] flex items-center justify-center">
              {images[proposal.id] ? (
                <img 
                  src={images[proposal.id]} 
                  alt={proposal.title} 
                  className="w-full h-full object-cover animate-fade-in" 
                />
              ) : (
                <div className="text-center p-8">
                  <div className="mb-4 flex justify-center text-slate-300">
                    <ImageIcon size={64} />
                  </div>
                  <p className="text-slate-500 mb-6 text-sm">Gemini Nano Banana Model을 사용하여<br/>제안서 컨셉 이미지를 생성해보세요.</p>
                  <button 
                    onClick={() => handleGenerateImage(proposal)}
                    disabled={loadingMap[proposal.id]}
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white px-5 py-2.5 rounded-full font-medium transition-all shadow-md disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {loadingMap[proposal.id] ? (
                      <>
                        <Loader2 className="animate-spin" size={18} />
                        생성 중 (Generating...)
                      </>
                    ) : (
                      <>
                        <Sparkles size={18} />
                        AI 인포그래픽 생성
                      </>
                    )}
                  </button>
                </div>
              )}
              {/* Badge */}
              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur text-blue-800 font-bold px-3 py-1 rounded shadow-sm">
                제안 {proposal.id}
              </div>
            </div>

            {/* Content Section */}
            <div className="lg:w-3/5 p-8 flex flex-col justify-between">
              <div>
                <div className="flex flex-wrap gap-2 mb-4">
                  {proposal.tags.map(tag => (
                    <span key={tag} className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded-md font-medium">
                      {tag}
                    </span>
                  ))}
                </div>
                
                <h3 className="text-2xl font-bold text-slate-900 mb-1">{proposal.title}</h3>
                <p className="text-lg text-blue-600 font-medium mb-6">"{proposal.subtitle}"</p>

                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="mt-1 min-w-[20px] text-slate-400"><Activity size={20} /></div>
                    <div>
                      <span className="font-bold text-slate-700 block mb-1">배경 및 목적</span>
                      <p className="text-slate-600 text-sm leading-relaxed">{proposal.background}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="mt-1 min-w-[20px] text-slate-400"><Users size={20} /></div>
                    <div>
                      <span className="font-bold text-slate-700 block mb-1">타겟</span>
                      <p className="text-slate-600 text-sm">{proposal.target}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="mt-1 min-w-[20px] text-slate-400"><MapPin size={20} /></div>
                    <div>
                      <span className="font-bold text-slate-700 block mb-1">주요 코스</span>
                      <p className="text-slate-600 text-sm">{proposal.course}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-100">
                 <h4 className="font-bold text-slate-800 mb-3 flex items-center gap-2">
                    <Sparkles size={16} className="text-yellow-500" /> 신규 액티비티
                 </h4>
                 <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {proposal.activities.map((act, i) => (
                        <li key={i} className="bg-slate-50 px-3 py-2 rounded text-sm text-slate-700 flex items-center before:content-['•'] before:mr-2 before:text-blue-500">
                            {act}
                        </li>
                    ))}
                 </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Proposals;
