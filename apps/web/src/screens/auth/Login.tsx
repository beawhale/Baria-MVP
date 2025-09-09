
import { useDispatch } from "react-redux"
import { useState } from "react"
import { signIn } from "@store/auth"
import { Button, Input, Card, CardContent, CardHeader, CardTitle } from "@ui"
export default function Login() {
  const d = useDispatch()
  const [email,setEmail]=useState("")
  const [pass,setPass]=useState("")
  return (
    <div className="h-full grid place-items-center p-6">
      <Card className="w-full max-w-sm">
        <CardHeader><CardTitle>Login</CardTitle></CardHeader>
        <CardContent className="grid gap-3">
          <Input placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
          <Input type="password" placeholder="Password" value={pass} onChange={e=>setPass(e.target.value)} />
          <Button onClick={()=>d(signIn({ token:"demo", user:{ id:"1", name:"Demo", email } }))}>Continue</Button>
        </CardContent>
      </Card>
    </div>
  )
}
