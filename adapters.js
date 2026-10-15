export const fullAdapters=new Set(['cinesrc','moviesapi','vidfast','embedmaster']);
export function commandMessage(adapter,command,value){
 if(adapter==='cinesrc')return {type:'cinesrc:command',command:({volume:'setVolume',status:'getCurrentTime'})[command]||command,args:value===undefined?[]:[value]};
 if(adapter==='moviesapi')return {action:({volume:'setVolume',status:'getStatus'})[command]||command,...(command==='seek'?{time:value}:command==='volume'?{volume:value}:{})};
 if(adapter==='vidfast')return {command:command==='status'?'getStatus':command,...(command==='seek'?{time:value}:command==='volume'?{level:value}:{})};
 if(adapter==='embedmaster')return command==='status'?{source:'embedmaster_player_command',command:'time'}:{source:'embedmaster_player_command',command,value:command==='volume'?value*100:value};
 if(adapter==='vidrift'&&command==='seek')return {type:'vidrift:resume',currentTime:value};
 return null;
}
export function parseEvent(adapter,input){
 let d=input;if(typeof d==='string'){try{d=JSON.parse(d)}catch{return null}}if(!d||typeof d!=='object')return null;
 let e,t,duration,playing;
 if(adapter==='cinesrc'&&typeof d.type==='string'&&d.type.startsWith('cinesrc:')){e=d.type.slice(8);const payload=d.data??d;t=payload.currentTime;duration=payload.duration;if(e==='response'){if(d.command==='getCurrentTime')t=d.result;if(d.command==='getDuration')duration=d.result;if(d.command==='getPaused')playing=!d.result}}
 else if(adapter==='moviesapi'&&d.source==='moviesapi-player'){e=d.event;t=d.currentTime;duration=d.duration;if(typeof d.paused==='boolean')playing=!d.paused}
 else if((adapter==='vidfast'||adapter==='vidlink'||adapter==='vixsrc')&&d.type==='PLAYER_EVENT'){e=d.data?.event;t=d.data?.currentTime;duration=d.data?.duration;playing=d.data?.playing}
 else if(adapter==='embedmaster'&&d.source==='embedmaster_player'){e=d.event;const p=d.info;t=typeof p==='number'&&['time','seek','timeupdate'].includes(e)?p:p?.currentTime??p?.time;duration=p?.duration}
 else if(adapter==='cinezo'&&['WATCH_PROGRESS','PLAYER_EVENT'].includes(d.type)){e=d.data?.event||'timeupdate';t=d.data?.currentTime;duration=d.data?.duration}
 else if(adapter==='vidrift'&&d.type?.startsWith('vidrift:')){e=({paused:'pause',unpaused:'play',progress:'timeupdate'})[d.type.slice(8)]||d.type.slice(8);t=d.currentTime;duration=d.duration}
 else if(adapter==='vidsrc'&&d.type==='PLAYER_EVENT'){e=d.data?.player_status==='playing'?'play':d.data?.player_status==='paused'?'pause':'timeupdate';t=d.data?.player_progress;duration=d.data?.player_duration}
 else if(adapter==='vidy'&&typeof d.event==='string'){e=d.event;t=d.currentTime;duration=d.duration}
 else return null;
 if(e==='play'||e==='playing')playing=true;if(['pause','paused','ended'].includes(e))playing=false;
 return {event:String(e||'message').slice(0,80),...(Number.isFinite(t)&&t>=0?{position:t}:{}),...(Number.isFinite(duration)&&duration>0?{duration}:{}),...(typeof playing==='boolean'?{playing}:{})};
}
