import { Injectable } from '@angular/core';
import {Subject} from 'rxjs'
import {Post} from "./post.model"
import {HttpClient} from "@angular/common/http"
import {map} from 'rxjs/operators'
import { Router } from '@angular/router';

@Injectable({providedIn: 'root'})
export class PostsService {
    private posts: Post[] = [];
    private postsUpdated = new Subject<Post[]>(); 

    constructor(private http: HttpClient, private router: Router) {

    }
    getPosts() {
        console.log("ASd")
        this.http.get<{message: string, posts: any}>("http://localhost:3001/api/posts")
        .pipe(map((postData) => {
            return postData.posts.map(post => { 
                return{
                    title: post.title,
                    content: post.content,
                    id: post._id
                }
            })
        })).subscribe(updatedPosts => {
            console.log(updatedPosts)
            this.posts = updatedPosts;
            this.postsUpdated.next([...this.posts])
        })
    }

    getPostUpdateListener() {
        return this.postsUpdated.asObservable()
    }

    getPost(id: string) {
        return this.http.get<{_id:string, title: string, content:string}>(
            "http://localhost:3001/api/posts/" + id)
    }

    addPost(title:string, content: string) {
        const post: Post = {title: title, content: content, id: null}
        this.http.post<{message: string, postId: string}>("http://localhost:3001/api/posts", post)
        .subscribe((resData) => {
            const id = resData.postId
            post.id = id
            this.posts.push(post)
            this.postsUpdated.next([...this.posts])
            this.router.navigate(["/"])
        })
       
       
    }
    updatePost(id:string, title: string, content: string) {
        const post: Post = {id, title, content}
        this.http.put("http://localhost:3001/api/posts/" + id, post)
            .subscribe((res) => {
                const updatedPosts = [...this.posts]
                const oldPostIndex = updatedPosts.findIndex(upost => upost.id === post.id)
                updatedPosts[oldPostIndex] = post
                this.posts = updatedPosts
                this.postsUpdated.next([...this.posts])
                this.router.navigate(["/"])
            })

    }
    deletePost(postId: string) {
         this.http.delete("http://localhost:3001/api/posts/" + postId)
            .subscribe(() => {
                const updatedPosts = this.posts.filter(post => post.id !== postId)
                this.posts = updatedPosts;
                this.postsUpdated.next([...this.posts])
            })   
    }
}