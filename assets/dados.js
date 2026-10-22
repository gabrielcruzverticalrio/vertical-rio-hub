// DADOS DE EXEMPLO (ficticios)
const PULSEIRAS={AZUL:'#1e63d6',VERDE:'#2e9d4f',AMARELO:'#f5c400',LARANJA:'#f07d1a',ROXO:'#7b3fbf',ROSA:'#e8559a',VERMELHO:'#c62828',BRANCO:'#f4f2ee'};
const ROTEIROS={CRISTO:{nome:'Cristo Redentor',min:12,preco:790},PANORAMICO:{nome:'Rio Panorâmico',min:20,preco:1290},COMPLETO:{nome:'Rio Completo',min:30,preco:1890},PRAIAS:{nome:'Praias e Lagoa',min:15,preco:990}};
const VOOS=[
 ['09:00','VR101','AZUL','CRISTO',4],['09:30','VR102','VERDE','PANORAMICO',3],['10:00','VR103','AMARELO','PRAIAS',5],
 ['10:30','VR104','LARANJA','COMPLETO',2],['11:00','VR105','ROXO','CRISTO',5],['11:30','VR106','ROSA','PANORAMICO',4],
 ['12:15','VR107','VERMELHO','PRAIAS',3],['13:00','VR108','BRANCO','CRISTO',6],['13:45','VR109','AZUL','COMPLETO',4],
 ['14:30','VR110','VERDE','PANORAMICO',5],['15:15','VR111','AMARELO','CRISTO',2],['16:00','VR112','LARANJA','PRAIAS',4],
 ['16:45','VR113','ROXO','PANORAMICO',3],['17:20','VR114','ROSA','CRISTO',5]
].map(([hora,voo,pulseira,rot,pax])=>({hora,voo,pulseira,rot,pax,min:ROTEIROS[rot].min,preco:ROTEIROS[rot].preco}));
const hm=s=>{const[a,b]=s.split(':').map(Number);return a*60+b};
const fmtHM=m=>String(Math.floor(m/60)).padStart(2,'0')+':'+String(Math.floor(m%60)).padStart(2,'0');
const STATUS=['CHECK-IN ABERTO','BRIEFING DE SEGURANÇA','EQUIPANDO','EMBARQUE'];
const STATUS_EN={'CHECK-IN ABERTO':'CHECK-IN OPEN','BRIEFING DE SEGURANÇA':'SAFETY BRIEFING','EQUIPANDO':'GEARING UP','EMBARQUE':'BOARDING'};
// fluxo simulado: decolou = sai do quadro
function statusDe(v,agora){const t=hm(v.hora);if(agora>=t)return'DECOLOU';if(agora>=t-15)return'EMBARQUE';if(agora>=t-30)return'EQUIPANDO';if(agora>=t-45)return'BRIEFING DE SEGURANÇA';return'CHECK-IN ABERTO'}
const COR_ST={'CHECK-IN ABERTO':'#f4f2ee','BRIEFING DE SEGURANÇA':'#4fa3ff','EQUIPANDO':'#f07d1a','EMBARQUE':'#f5c400','DECOLOU':'#86dc9b'};
const COR_ST_CLARO={'CHECK-IN ABERTO':'#ebeaea','BRIEFING DE SEGURANÇA':'#a9d0ff','EQUIPANDO':'#ffc48f','EMBARQUE':'#f5c400','DECOLOU':'#86dc9b'};
const HELINEWS=[[0,40,9750,'até 40h'],[41,50,9150,'41 a 50h'],[51,60,8950,'51 a 60h'],[61,70,8500,'61 a 70h'],[71,80,7850,'71 a 80h'],[81,90,7500,'81 a 90h'],[91,100,7400,'91 a 100h'],[101,1e9,7350,'acima de 101h']];
const HORAS_MES=64.5, VOOS_MES=231; // acumulado ficticio no mes
function faixa(h){const hh=Math.ceil(h);return HELINEWS.find(f=>hh>=f[0]&&hh<=f[1])||HELINEWS[0]}
const TAXAS={plataforma:6.5,cartao:3.2}; // % ficticios
// clima ficticio por hora e semana
const CLIMA_HORA={9:{c:'Sol',v:8,vis:10,ch:0},10:{c:'Sol',v:10,vis:10,ch:0},11:{c:'Sol',v:12,vis:10,ch:0},12:{c:'Poucas nuvens',v:14,vis:9,ch:5},13:{c:'Poucas nuvens',v:16,vis:8,ch:10},14:{c:'Nublado',v:19,vis:7,ch:20},15:{c:'Nublado',v:22,vis:6,ch:35},16:{c:'Pancadas',v:27,vis:4,ch:60},17:{c:'Pancadas',v:25,vis:4,ch:55}};
const CLIMA_SEMANA=[['Qui 22','Sol e nuvens',29,21,'amarelo'],['Sex 23','Sol',31,22,'verde'],['Sáb 24','Sol',32,23,'verde'],['Dom 25','Chuva',24,20,'vermelho'],['Seg 26','Nublado',26,20,'amarelo'],['Ter 27','Sol',30,21,'verde'],['Qua 28','Sol',30,22,'verde']];
function semaforo(h){const c=CLIMA_HORA[h]||CLIMA_HORA[17];if(c.v>=25||c.vis<5||c.ch>=50)return'vermelho';if(c.v>=18||c.vis<8||c.ch>=20)return'amarelo';return'verde'}
const SEM_COR={verde:'#2e9d4f',amarelo:'#f5c400',vermelho:'#c62828'};
const brl=n=>'R$ '+n.toLocaleString('pt-BR',{minimumFractionDigits:2,maximumFractionDigits:2});
const param=k=>new URLSearchParams(location.search).get(k);
