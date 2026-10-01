export type DemoCredentials = { email: string; password: string };
export function ProjectAccess({ notice, credentials }: { notice?: string; credentials?: DemoCredentials }) {
  if (!notice && !credentials) return null;
  return <aside className="project-access" aria-label="Demo access information">{notice ? <p>{notice}</p> : null}{credentials ? <dl><div><dt>Email</dt><dd>{credentials.email}</dd></div><div><dt>Password</dt><dd>{credentials.password}</dd></div></dl> : null}</aside>;
}
