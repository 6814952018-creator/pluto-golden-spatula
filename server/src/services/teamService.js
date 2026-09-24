import { store } from '../data/store.js';

export function analyzeTeam({ championIds = [], itemAssignments = [] }) {
  const selected = store.champions.filter((champion) => championIds.includes(champion.id));
  const traitCounts = selected.flatMap((champion) => champion.traits).reduce((counts, trait) => ({ ...counts, [trait]: (counts[trait] || 0) + 1 }), {});
  const activeTraits = Object.entries(traitCounts).filter(([, count]) => count >= 2).map(([name, count]) => ({ name, count }));
  const score = Math.min(100, 48 + selected.length * 6 + activeTraits.length * 7 + (itemAssignments.length ? 5 : 0));
  const usedTraits = new Set(selected.flatMap((champion) => champion.traits));
  const suggested = store.champions.find((champion) => !championIds.includes(champion.id) && champion.traits.some((trait) => usedTraits.has(trait)));
  return { score, selected, traitCounts, activeTraits, strengths: activeTraits.length ? ['มี Trait ทำงานแล้ว', 'โครงสร้างทีมเริ่มสมดุล'] : ['มีพื้นที่ให้ปรับทีมอีกมาก'], weaknesses: selected.length < 4 ? ['ยูนิตในทีมยังน้อย'] : ['ควรเพิ่ม Trait ให้ครบระดับถัดไป'], recommendations: suggested ? [`เพิ่ม ${suggested.name} เพื่อช่วยเปิด Trait ${suggested.traits[0]}`] : ['ตรวจสอบไอเทมให้เหมาะกับ Role ของแต่ละยูนิต'], itemAssignments };
}

export function recommendTeam(payload) {
  const analysis = analyzeTeam(payload);
  const missing = store.champions.filter((champion) => !payload.championIds.includes(champion.id)).slice(0, 2);
  return { ...analysis, recommendedChampions: missing, recommendedItems: store.items.filter((item) => item.champions.some((name) => analysis.selected.some((champion) => champion.name === name))) };
}
