import { ImageResponse } from "next/og";
export const alt = "Godwin Ekanem — Software Engineer building AI products beyond the demo";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export default function Image() {
  return new ImageResponse(<div style={{width:"100%",height:"100%",display:"flex",flexDirection:"column",justifyContent:"space-between",background:"#f7f7f4",color:"#171918",padding:"72px 78px",fontFamily:"Arial, sans-serif"}}><div style={{display:"flex",alignItems:"center",gap:16,fontSize:24,fontWeight:700}}><div style={{width:48,height:48,display:"flex",alignItems:"center",justifyContent:"center",borderRadius:13,background:"#171918",color:"white",fontSize:18}}>GE</div>Godwin Ekanem</div><div style={{display:"flex",flexDirection:"column",gap:24}}><div style={{color:"#155f6d",fontSize:20,letterSpacing:2,textTransform:"uppercase"}}>Software Engineer · AI Systems · Automation</div><div style={{maxWidth:1010,fontSize:72,lineHeight:1.02,letterSpacing:-4,fontWeight:650}}>AI products that work beyond the demo.</div></div><div style={{display:"flex",gap:30,color:"#626864",fontSize:19}}>Voice AI · Agentic Applications · Intelligent Automation</div></div>, size);
}
