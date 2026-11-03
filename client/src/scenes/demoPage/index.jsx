import { useState } from "react";
import { Box, Avatar, Button, Card, CardContent, Chip, Container, Divider, IconButton, Stack, TextField, Typography } from "@mui/material";
import { FavoriteBorder, Favorite, ChatBubbleOutline, DarkMode, LightMode } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { setMode } from "../../state";

const initialPosts = [
  { id: 1, author: "Alex Morgan", initials: "AM", time: "2 hours ago", text: "Just finished building a new React project. Learning how to manage state across components has been a great experience.", likes: 12, liked: false },
  { id: 2, author: "Jordan Lee", initials: "JL", time: "Yesterday", text: "Sharing a quick update from my latest software project. What technologies are you exploring lately?", likes: 8, liked: false },
];
export default function DemoPage() {
  const [posts, setPosts] = useState(initialPosts);
  const [draft, setDraft] = useState("");
  const [comments, setComments] = useState({});
  const mode = useSelector(state => state.mode);
  const dispatch = useDispatch();
  const publish = () => { if (!draft.trim()) return; setPosts([{id: Date.now(), author:"Demo Visitor", initials:"DV", time:"Just now", text:draft.trim(), likes:0, liked:false}, ...posts]); setDraft(""); };
  const like = id => setPosts(items => items.map(p => p.id === id ? {...p, liked:!p.liked, likes:p.likes+(p.liked?-1:1)} : p));
  return <Box sx={{minHeight:"100vh", bgcolor:"background.default", pb:8}}>
    <Box sx={{bgcolor:"background.alt",borderBottom:"1px solid",borderColor:"divider",py:2}}>
      <Container maxWidth="lg"><Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography variant="h4" fontWeight="bold" color="primary">AgoraPedia</Typography>
        <Stack direction="row" alignItems="center" spacing={1}><Chip label="Portfolio demo" color="primary" variant="outlined" size="small"/><IconButton aria-label="Toggle theme" onClick={()=>dispatch(setMode())}>{mode==="dark"?<LightMode/>:<DarkMode/>}</IconButton></Stack>
      </Stack></Container>
    </Box>
    <Container maxWidth="md" sx={{mt:4}}>
      <Typography variant="h5" fontWeight="bold" gutterBottom>Welcome to AgoraPedia</Typography>
      <Typography color="text.secondary" sx={{mb:3}}>Explore a frontend-only preview of the social feed. Create posts, like updates, and add comments. Changes stay in this browser session; no account or server is required.</Typography>
      <Card sx={{mb:3,borderRadius:3}}><CardContent><Stack direction="row" spacing={2} alignItems="center"><Avatar>DV</Avatar><Typography fontWeight="bold">Demo Visitor</Typography></Stack><TextField multiline minRows={2} fullWidth value={draft} onChange={e=>setDraft(e.target.value)} placeholder="What's on your mind?" sx={{my:2}}/><Button variant="contained" onClick={publish} disabled={!draft.trim()}>Share post</Button></CardContent></Card>
      <Stack spacing={2}>{posts.map(p=><Card key={p.id} sx={{borderRadius:3}}><CardContent><Stack direction="row" spacing={2} alignItems="center"><Avatar>{p.initials}</Avatar><Box><Typography fontWeight="bold">{p.author}</Typography><Typography variant="caption" color="text.secondary">{p.time}</Typography></Box></Stack><Typography sx={{my:2,whiteSpace:"pre-wrap"}}>{p.text}</Typography><Divider/><Stack direction="row" spacing={2} alignItems="center" sx={{my:1}}><Button startIcon={p.liked?<Favorite/>:<FavoriteBorder/>} onClick={()=>like(p.id)}>{p.likes} Likes</Button><Chip size="small" icon={<ChatBubbleOutline/>} label={((comments[p.id]||[]).length)+" comments"} variant="outlined"/></Stack>{(comments[p.id]||[]).map((c,i)=><Typography key={i} sx={{py:1,px:2,bgcolor:"action.hover",borderRadius:2,mb:1}}><strong>Demo Visitor:</strong> {c}</Typography>)}<Stack direction="row" spacing={1}><TextField size="small" fullWidth placeholder="Write a comment" id={"comment-"+p.id} onKeyDown={e=>{if(e.key==="Enter"&&e.currentTarget.value.trim()){setComments(v=>({...v,[p.id]:[...(v[p.id]||[]),e.currentTarget.value.trim()]}));e.currentTarget.value="";}}}/><Typography variant="caption" sx={{alignSelf:"center"}}>Enter to post</Typography></Stack></CardContent></Card>)}</Stack>
      <Typography variant="caption" color="text.secondary" display="block" sx={{mt:4}}>Demo content is illustrative and is not connected to the original AgoraPedia backend.</Typography>
    </Container>
  </Box>;
}
