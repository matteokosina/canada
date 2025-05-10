import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { recentPost } from "./recent-post";
import ReactMarkdown from "react-markdown";
export default function RecentPost() {
  return (
    <div className="flex flex-col items-center justify-center w-full py-10">
        <h1 className="text-3xl font-bold text-center text-black dark:text-white">
           Aktueller Blog-Post
        </h1>   
      <a
        href={recentPost.link}
        className="block p-4 bg-white rounded-lg transition duration-300 mx-auto"
      >
        <Card className="max-w-3xl mx-auto">
          <CardHeader className="flex flex-row justify-between items-start">
            <div>
              <CardTitle style={{fontSize:"xx-large"}}>{recentPost.title}</CardTitle>
              <CardDescription>von {recentPost.author} am {recentPost.date}</CardDescription>
            </div>
            <img 
              className="rounded-full w-12 h-12 object-cover" 
              src={recentPost.authorAvatar} 
              alt={`${recentPost.author}'s avatar`}
            />
          </CardHeader>
          <CardContent>
            <ReactMarkdown>{recentPost.content}</ReactMarkdown>
          </CardContent>
        </Card>
      </a>
    </div>
  );
}
