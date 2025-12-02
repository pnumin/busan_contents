import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend } from 'recharts';
import { SENTIMENT_DATA, KEYWORD_DATA, HOT_SPOTS, PAIN_POINTS } from '../constants';
import { TrendingUp, MessageCircle, AlertTriangle, Lightbulb } from 'lucide-react';

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-8 animate-fade-in">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-slate-800 mb-2">부산 관광 활성화 전략 분석 (Ver 2.0)</h1>
        <p className="text-slate-600 max-w-2xl mx-auto">
          유튜브 댓글 심층 분석을 통해 도출된 데이터 기반 인사이트입니다. 
          기존 해운대 중심 관광에서 벗어나 <span className="text-blue-600 font-bold">다대포, 이기대 등 자연 친화적 명소</span>로의 전환이 필요합니다.
        </p>
      </div>

      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex flex-col items-center text-center">
          <div className="p-3 bg-green-100 text-green-600 rounded-full mb-4">
            <TrendingUp size={24} />
          </div>
          <h3 className="font-semibold text-slate-800">핵심 키워드</h3>
          <p className="text-2xl font-bold text-slate-900 mt-1">#다대포재발견</p>
          <p className="text-xs text-slate-500 mt-2">상승 트렌드 1위</p>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex flex-col items-center text-center">
          <div className="p-3 bg-blue-100 text-blue-600 rounded-full mb-4">
            <Lightbulb size={24} />
          </div>
          <h3 className="font-semibold text-slate-800">신규 발굴 명소</h3>
          <p className="text-2xl font-bold text-slate-900 mt-1">UN기념공원</p>
          <p className="text-xs text-slate-500 mt-2">댓글 추천 급증</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex flex-col items-center text-center">
          <div className="p-3 bg-red-100 text-red-600 rounded-full mb-4">
            <AlertTriangle size={24} />
          </div>
          <h3 className="font-semibold text-slate-800">주요 불만(Pain Point)</h3>
          <p className="text-xl font-bold text-slate-900 mt-1">"새로운 게 없다"</p>
          <p className="text-xs text-slate-500 mt-2">차별화된 경험 필요</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex flex-col items-center text-center">
          <div className="p-3 bg-purple-100 text-purple-600 rounded-full mb-4">
            <MessageCircle size={24} />
          </div>
          <h3 className="font-semibold text-slate-800">시청자 긍정 반응</h3>
          <p className="text-2xl font-bold text-slate-900 mt-1">65%</p>
          <p className="text-xs text-slate-500 mt-2">전반적 만족도</p>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Sentiment Chart */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
          <h3 className="text-lg font-bold text-slate-800 mb-6">시청자 댓글 감정 분석</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={SENTIMENT_DATA}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {SENTIMENT_DATA.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend verticalAlign="bottom" height={36}/>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Keyword Frequency */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
          <h3 className="text-lg font-bold text-slate-800 mb-6">언급 빈도수 TOP 키워드</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={KEYWORD_DATA} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                <XAxis type="number" />
                <YAxis dataKey="name" type="category" width={60} />
                <Tooltip cursor={{fill: 'transparent'}} />
                <Bar dataKey="value" fill="#3b82f6" radius={[0, 4, 4, 0]} barSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Text Insights */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-blue-50 p-6 rounded-xl border border-blue-100">
          <h3 className="text-lg font-bold text-blue-900 mb-4">Hot Spots (긍정 반응)</h3>
          <ul className="space-y-3">
            {HOT_SPOTS.map((spot, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="bg-blue-200 text-blue-800 text-xs font-bold px-2 py-0.5 rounded mt-1">BEST</span>
                <div>
                  <span className="font-bold text-slate-800">{spot.name}</span>
                  <p className="text-sm text-slate-600">{spot.desc}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
        
        <div className="bg-red-50 p-6 rounded-xl border border-red-100">
          <h3 className="text-lg font-bold text-red-900 mb-4">Pain Points (개선 요구)</h3>
          <ul className="space-y-3">
            {PAIN_POINTS.map((point, idx) => (
              <li key={idx} className="flex items-center gap-2 text-slate-700">
                <span className="w-1.5 h-1.5 bg-red-400 rounded-full"></span>
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
