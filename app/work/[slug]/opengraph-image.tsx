import { ImageResponse } from "next/og";
import { getProjectBySlug } from "@/lib/projects";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function ProjectOpenGraphImage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  const title = project?.title ?? "Project case study";
  const category = project?.category ?? "Software Engineering";
  return new ImageResponse(<div style={{width:"100%",height:"100%",display:"flex",flexDirection:"column",justifyContent:"space-between",padding:"68px 74px",background:"#f7f7f4",color:"#171918",fontFamily:"Arial, sans-serif"}}><div style={{display:"flex",alignItems:"center",justifyContent:"space-between",fontSize:22,fontWeight:700}}><span>Godwin Ekanem</span><span style={{color:"#155f6d",fontSize:17,textTransform:"uppercase",letterSpacing:2}}>Case study</span></div><div style={{display:"flex",flexDirection:"column",gap:20}}><div style={{color:"#155f6d",fontSize:18,textTransform:"uppercase",letterSpacing:2}}>{category}</div><div style={{maxWidth:1050,fontSize:78,lineHeight:1,letterSpacing:-4,fontWeight:650}}>{title}</div></div><div style={{display:"flex",alignItems:"center",gap:14,color:"#626864",fontSize:20}}><span style={{width:9,height:9,borderRadius:99,background:"#2d8b61"}} /> Built beyond the demo</div></div>, size);
}
