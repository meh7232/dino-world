'use client';

import { useState, useEffect } from 'react';

interface Dino {
  id: string;
  ko: string;
  en: string;
  wiki: string;
  era: string;
  age: string;
  diet: '육식' | '초식' | '잡식';
  size: string;
  weight: string;
  found: string;
  desc: string;
  fun: string;
  emoji: string;
  features: string[];
}

const DINOS: Dino[] = [
  {
    id: 'trex', ko: '티라노사우루스', en: 'Tyrannosaurus Rex', wiki: 'Tyrannosaurus',
    era: '백악기 후기', age: '약 6,600만 년 전', diet: '육식', size: '약 12m', weight: '약 8톤', found: '북아메리카',
    desc: '역사상 가장 유명한 육식 공룡이에요! 강력한 턱과 날카로운 이빨로 큰 먹이를 사냥했고 두 발로 걸었으며 앞발은 매우 짧았답니다.',
    fun: '이빨 하나의 길이가 무려 30cm나 됐어요! 🦷',
    emoji: '🦖', features: ['최강 턱 악력', '두 발로 걷기', '짧은 앞발'],
  },
  {
    id: 'triceratops', ko: '트리케라톱스', en: 'Triceratops', wiki: 'Triceratops',
    era: '백악기 후기', age: '약 6,800만 년 전', diet: '초식', size: '약 9m', weight: '약 12톤', found: '북아메리카',
    desc: '이마에 세 개의 뿔이 있는 공룡이에요. 큰 방패 모양의 목 장식(프릴)이 특징이고 티라노사우루스와 같은 시대에 살았답니다.',
    fun: '머리 프릴이 색깔을 바꿀 수 있었을 거라고 해요! 🌈',
    emoji: '🦕', features: ['뿔 세 개', '방패 프릴', '네 발 보행'],
  },
  {
    id: 'brachiosaurus', ko: '브라키오사우루스', en: 'Brachiosaurus', wiki: 'Brachiosaurus',
    era: '쥐라기 후기', age: '약 1억 5,400만 년 전', diet: '초식', size: '약 26m', weight: '약 56톤', found: '북아메리카, 아프리카',
    desc: '기린처럼 앞다리가 뒷다리보다 길고 목이 매우 긴 공룡이에요. 높은 나무 꼭대기의 잎사귀를 먹을 수 있었답니다.',
    fun: '심장이 사람 심장보다 10배나 컸어요! 💓',
    emoji: '🦕', features: ['긴 목', '앞발이 더 길어', '높은 나뭇잎 섭취'],
  },
  {
    id: 'velociraptor', ko: '벨로키랍토르', en: 'Velociraptor', wiki: 'Velociraptor',
    era: '백악기 후기', age: '약 7,500만 년 전', diet: '육식', size: '약 1.8m', weight: '약 15kg', found: '아시아 (몽골, 중국)',
    desc: '쥐라기 공원에서 유명해진 공룡이에요. 실제로는 영화보다 훨씬 작았고 매우 빠르고 영리했답니다.',
    fun: '실제로는 깃털이 있었어요! 새의 조상이랍니다 🐦',
    emoji: '🦖', features: ['날카로운 발톱', '깃털 보유', '고지능'],
  },
  {
    id: 'stegosaurus', ko: '스테고사우루스', en: 'Stegosaurus', wiki: 'Stegosaurus',
    era: '쥐라기 후기', age: '약 1억 5,500만 년 전', diet: '초식', size: '약 9m', weight: '약 3.5톤', found: '북아메리카, 유럽',
    desc: '등에 마름모꼴의 뼈 판이 두 줄로 늘어선 공룡이에요. 꼬리에는 뾰족한 가시가 있어 방어에 사용했어요.',
    fun: '뇌가 호두만큼 작았다고 해요! 🧠',
    emoji: '🦕', features: ['등 뼈 판', '꼬리 가시', '초식 공룡'],
  },
  {
    id: 'pteranodon', ko: '프테라노돈', en: 'Pteranodon', wiki: 'Pteranodon',
    era: '백악기 후기', age: '약 8,600만 년 전', diet: '육식', size: '날개 약 7m', weight: '약 20kg', found: '북아메리카',
    desc: '하늘을 날아다닌 파충류예요 (공룡은 아니에요). 날개를 펼치면 7미터가 넘었고 물고기를 잡아먹었어요.',
    fun: '사실 공룡이 아닌 하늘을 나는 파충류예요! ✈️',
    emoji: '🦅', features: ['날개 7m', '물고기 사냥', '공룡 아님'],
  },
  {
    id: 'ankylosaurus', ko: '안킬로사우루스', en: 'Ankylosaurus', wiki: 'Ankylosaurus',
    era: '백악기 후기', age: '약 6,700만 년 전', diet: '초식', size: '약 10m', weight: '약 6톤', found: '북아메리카',
    desc: '온몸이 갑옷 같은 뼈 판으로 덮여 있고 꼬리 끝에 뼈 망치가 있어요. 티라노사우루스도 이 꼬리 공격에는 당할 수 없었답니다.',
    fun: '꼬리 뼈 망치로 티라노사우루스 다리뼈를 부술 수 있었어요! 🔨',
    emoji: '🛡️', features: ['전신 갑옷', '꼬리 망치', '최강 방어'],
  },
  {
    id: 'spinosaurus', ko: '스피노사우루스', en: 'Spinosaurus', wiki: 'Spinosaurus',
    era: '백악기 중기', age: '약 9,500만 년 전', diet: '육식', size: '약 14~18m', weight: '약 7~23톤', found: '북아프리카',
    desc: '지금까지 알려진 가장 큰 육식 공룡이에요. 등에 큰 돛 모양 뼈가 있으며 물고기를 즐겨 먹었어요.',
    fun: '티라노사우루스보다 더 크지만 주로 물고기를 먹었어요 🐟',
    emoji: '🦖', features: ['가장 큰 육식', '등 돛 모양', '수영 가능'],
  },
  {
    id: 'diplodocus', ko: '디플로도쿠스', en: 'Diplodocus', wiki: 'Diplodocus',
    era: '쥐라기 후기', age: '약 1억 5,400만 년 전', diet: '초식', size: '약 27m', weight: '약 16톤', found: '북아메리카',
    desc: '목과 꼬리가 매우 길었던 공룡이에요. 긴 꼬리를 채찍처럼 휘두를 수 있었답니다.',
    fun: '꼬리를 채찍처럼 휘두르면 음속을 돌파하는 소리가 났어요! 💨',
    emoji: '🦕', features: ['27m 초장신', '채찍 꼬리', '긴 목'],
  },
  {
    id: 'parasaurolophus', ko: '파라사우롤로푸스', en: 'Parasaurolophus', wiki: 'Parasaurolophus',
    era: '백악기 후기', age: '약 7,500만 년 전', diet: '초식', size: '약 9.5m', weight: '약 3.5톤', found: '북아메리카',
    desc: '머리 위에 긴 볏이 있어요. 이 볏으로 트럼펫 같은 소리를 낼 수 있었답니다.',
    fun: '머리의 볏은 소리를 내는 악기 역할을 했어요! 🎺',
    emoji: '🦕', features: ['머리 볏', '트럼펫 소리', '무리 생활'],
  },
  {
    id: 'allosaurus', ko: '알로사우루스', en: 'Allosaurus', wiki: 'Allosaurus',
    era: '쥐라기 후기', age: '약 1억 5,500만 년 전', diet: '육식', size: '약 12m', weight: '약 2톤', found: '북아메리카, 유럽',
    desc: '쥐라기 시대의 최강 포식자예요. 날카로운 이빨과 발톱으로 큰 공룡도 사냥했어요.',
    fun: '무리를 지어 큰 공룡을 협동 사냥했을 수도 있어요! 🤝',
    emoji: '🦖', features: ['쥐라기 최강자', '협동 사냥', '날카로운 발톱'],
  },
  {
    id: 'pachycephalosaurus', ko: '파키케팔로사우루스', en: 'Pachycephalosaurus', wiki: 'Pachycephalosaurus',
    era: '백악기 후기', age: '약 7,000만 년 전', diet: '초식', size: '약 4.5m', weight: '약 450kg', found: '북아메리카',
    desc: '머리 꼭대기가 두꺼운 돔 모양의 뼈로 덮여 있어요. 숫양처럼 머리를 부딪혀 싸웠던 것으로 보여요.',
    fun: '두개골 두께가 25cm나 됐어요! 🪨',
    emoji: '🦕', features: ['돔형 머리뼈', '박치기 싸움', '두꺼운 두개골'],
  },
  {
    id: 'iguanodon', ko: '이구아노돈', en: 'Iguanodon', wiki: 'Iguanodon',
    era: '백악기 전기', age: '약 1억 2,600만 년 전', diet: '초식', size: '약 10m', weight: '약 3.4톤', found: '유럽, 아시아, 북아메리카',
    desc: '두 발 또는 네 발로 걸을 수 있었던 공룡이에요. 엄지손가락이 뾰족한 가시 형태라 방어에 사용했답니다.',
    fun: '처음 발견됐을 때 코에 뿔이 있다고 잘못 생각했어요! 🦏',
    emoji: '🦕', features: ['두·네 발 모두', '가시 엄지', '초기 발견 공룡'],
  },
  {
    id: 'therizinosaurus', ko: '테리지노사우루스', en: 'Therizinosaurus', wiki: 'Therizinosaurus',
    era: '백악기 후기', age: '약 7,000만 년 전', diet: '초식', size: '약 10m', weight: '약 5톤', found: '아시아 (몽골, 중국)',
    desc: '손톱이 역사상 가장 긴 공룡이에요. 무시무시해 보이지만 나뭇잎과 식물을 먹는 초식 공룡이었어요.',
    fun: '손톱 길이가 1m나 됐어요! ✂️',
    emoji: '🦕', features: ['1m 손톱', '초식 공룡', '가장 긴 손톱'],
  },
  {
    id: 'carnotaurus', ko: '카르노타우루스', en: 'Carnotaurus', wiki: 'Carnotaurus',
    era: '백악기 후기', age: '약 7,200만 년 전', diet: '육식', size: '약 8m', weight: '약 1.5톤', found: '남아메리카 (아르헨티나)',
    desc: '황소처럼 이마에 뿔이 있는 육식 공룡이에요. 육식 공룡 중 매우 빠른 속도로 달릴 수 있었답니다.',
    fun: '시속 56km로 달릴 수 있었어요! 🏃',
    emoji: '🦖', features: ['이마 뿔', '최고속 육식', '시속 56km'],
  },
];

const DIET_COLOR: Record<string, string> = {
  '육식': 'text-red-600 bg-red-50 border-red-200',
  '초식': 'text-green-700 bg-green-50 border-green-200',
  '잡식': 'text-yellow-700 bg-yellow-50 border-yellow-200',
};
const DIET_ICON: Record<string, string> = { '육식': '🥩', '초식': '🌿', '잡식': '🌱' };
const DIET_TOP: Record<string, string> = { '육식': 'border-t-red-400', '초식': 'border-t-green-500', '잡식': 'border-t-yellow-400' };

function StatItem({ icon, label, value }: { icon: string; label: string; value: string }) {
  return (
    <div className="bg-gray-50 rounded-xl p-3">
      <p className="text-xs text-gray-400">{icon} {label}</p>
      <p className="font-bold text-gray-700 text-sm mt-0.5">{value}</p>
    </div>
  );
}

export default function DinoWorld() {
  const [images, setImages] = useState<Record<string, string>>({});
  const [filter, setFilter] = useState<'전체' | '육식' | '초식'>('전체');
  const [selected, setSelected] = useState<Dino | null>(null);
  const [search, setSearch] = useState('');
  const [imgErr, setImgErr] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const fetchImages = async () => {
      const results: Record<string, string> = {};
      await Promise.all(
        DINOS.map(async (dino) => {
          try {
            const res = await fetch(
              `https://en.wikipedia.org/w/api.php?action=query&titles=${dino.wiki}&prop=pageimages&pithumbsize=500&format=json&origin=*`
            );
            const data = await res.json();
            const pages = data.query?.pages;
            if (pages) {
              const pageId = Object.keys(pages)[0];
              const thumb = pages[pageId]?.thumbnail?.source;
              if (thumb) results[dino.id] = thumb;
            }
          } catch {}
        })
      );
      setImages(results);
    };
    fetchImages();
  }, []);

  const filtered = DINOS
    .filter(d => filter === '전체' || d.diet === filter)
    .filter(d => search === '' || d.ko.includes(search) || d.en.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="min-h-screen bg-gray-50">

      {/* 헤더 */}
      <div className="bg-emerald-900 text-white px-4 pt-10 pb-8 text-center">
        <p className="text-5xl mb-2">🦕</p>
        <h1 className="text-3xl font-black tracking-tight">공룡 탐험대</h1>
        <p className="text-emerald-300 text-sm mt-1">놀라운 공룡의 세계를 탐험해봐요!</p>
        <p className="text-emerald-500 text-xs mt-1">{DINOS.length}종의 공룡</p>
      </div>

      {/* 검색 & 필터 */}
      <div className="sticky top-0 z-10 bg-white border-b border-gray-100 px-4 py-3 shadow-sm">
        <input
          type="text"
          placeholder="🔍 공룡 이름 검색..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full border border-gray-200 rounded-xl px-4 py-2 text-sm mb-3 focus:outline-none focus:border-emerald-400 bg-gray-50"
        />
        <div className="flex gap-2">
          {(['전체', '육식', '초식'] as const).map(f => (
            <button key={f} onClick={() => setFilter(f)}
              className={`px-4 py-1.5 rounded-full text-sm font-bold border transition-all ${
                filter === f
                  ? f === '육식' ? 'bg-red-500 text-white border-red-500'
                  : f === '초식' ? 'bg-green-600 text-white border-green-600'
                  : 'bg-emerald-800 text-white border-emerald-800'
                  : 'bg-white text-gray-500 border-gray-200'
              }`}>
              {f === '전체' ? `🦕 전체 (${DINOS.length})` : f === '육식' ? `🥩 육식 (${DINOS.filter(d => d.diet === '육식').length})` : `🌿 초식 (${DINOS.filter(d => d.diet === '초식').length})`}
            </button>
          ))}
        </div>
      </div>

      {/* 카드 그리드 */}
      <div className="grid grid-cols-2 gap-3 p-4 max-w-2xl mx-auto pb-12">
        {filtered.map(dino => (
          <button key={dino.id} onClick={() => setSelected(dino)}
            className={`bg-white rounded-2xl shadow border-t-4 overflow-hidden text-left transition-all active:scale-95 hover:shadow-md ${DIET_TOP[dino.diet]}`}>

            {/* 공룡 이미지 */}
            <div className="w-full h-40 bg-white flex items-center justify-center overflow-hidden">
              {images[dino.id] && !imgErr[dino.id] ? (
                <img
                  src={images[dino.id]}
                  alt={dino.ko}
                  className="w-full h-full object-cover"
                  onError={() => setImgErr(prev => ({ ...prev, [dino.id]: true }))}
                />
              ) : (
                <span className="text-7xl">{dino.emoji}</span>
              )}
            </div>

            {/* 이름 & 정보 */}
            <div className="px-3 pb-3 pt-2">
              <p className="font-black text-gray-800 text-sm leading-tight">{dino.ko}</p>
              <p className="text-xs text-gray-400 mt-0.5">{dino.en}</p>
              <div className="flex gap-1 mt-2 flex-wrap">
                <span className={`text-xs px-2 py-0.5 rounded-full border font-medium ${DIET_COLOR[dino.diet]}`}>
                  {DIET_ICON[dino.diet]} {dino.diet}
                </span>
                <span className="text-xs px-2 py-0.5 rounded-full border bg-purple-50 text-purple-700 border-purple-200 font-medium">
                  {dino.era.replace(' 후기', '').replace(' 전기', '').replace(' 중기', '')}
                </span>
              </div>
              <div className="flex flex-wrap gap-1 mt-2">
                {dino.features.map(f => (
                  <span key={f} className="text-xs bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded-md">{f}</span>
                ))}
              </div>
            </div>
          </button>
        ))}

        {filtered.length === 0 && (
          <div className="col-span-2 text-center py-16 text-gray-400">
            <p className="text-4xl mb-2">🦕</p>
            <p className="text-sm">검색 결과가 없어요</p>
          </div>
        )}
      </div>

      {/* 상세 모달 */}
      {selected && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-end sm:items-center justify-center"
          onClick={() => setSelected(null)}>
          <div className="bg-white w-full max-w-lg rounded-t-3xl sm:rounded-3xl max-h-[92vh] overflow-y-auto relative"
            onClick={e => e.stopPropagation()}>

            <div className={`w-full h-64 flex items-center justify-center overflow-hidden rounded-t-3xl ${
              selected.diet === '육식' ? 'bg-red-50' : 'bg-green-50'
            }`}>
              {images[selected.id] && !imgErr[selected.id] ? (
                <img src={images[selected.id]} alt={selected.ko} className="w-full h-full object-cover" />
              ) : (
                <span className="text-9xl">{selected.emoji}</span>
              )}
            </div>

            <button onClick={() => setSelected(null)}
              className="absolute top-3 right-3 bg-gray-100 rounded-full w-8 h-8 flex items-center justify-center text-gray-500 font-bold text-sm">
              ✕
            </button>

            <div className="p-6 pt-4">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h2 className="text-2xl font-black text-gray-800">{selected.ko}</h2>
                  <p className="text-gray-400 text-sm">{selected.en}</p>
                </div>
                <span className={`text-xs px-3 py-1 rounded-full border font-bold flex-shrink-0 ${DIET_COLOR[selected.diet]}`}>
                  {DIET_ICON[selected.diet]} {selected.diet}
                </span>
              </div>

              <div className="flex flex-wrap gap-2 mt-3">
                {selected.features.map(f => (
                  <span key={f} className="text-sm bg-emerald-50 text-emerald-700 border border-emerald-200 px-3 py-1 rounded-full font-medium">
                    ✦ {f}
                  </span>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-3 mt-5">
                <StatItem icon="🕐" label="시대" value={selected.era} />
                <StatItem icon="🌍" label="발견지" value={selected.found} />
                <StatItem icon="📏" label="크기" value={selected.size} />
                <StatItem icon="⚖️" label="무게" value={selected.weight} />
              </div>

              <p className="text-gray-600 text-sm leading-relaxed mt-5">{selected.desc}</p>

              <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 mt-4">
                <p className="text-xs font-bold text-amber-600 mb-1">💡 재미있는 사실!</p>
                <p className="text-sm text-amber-800 font-medium">{selected.fun}</p>
              </div>

              <p className="text-center text-xs text-gray-300 mt-4">{selected.age}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
