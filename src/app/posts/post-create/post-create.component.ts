import { Component } from '@angular/core';

@Component({
    templateUrl: "./post-create.component.html",
    selector: "app-post-create",
    styleUrls: ["./post-create.component.css"]

})
export class PostCreateComponent {
    enteredValue='';
    newPost = '';
    onAddPost(){
        
       this.newPost = this.enteredValue
    }
}