import {VideoService} from './../video.service';
import {Video} from './../video';
import { Component, OnInit } from '@angular/core';

import {Http} from '@angular/http';
import 'rxjs/add/operator/map'


@Component({
  selector: 'app-video-center',
  templateUrl: './video-center.component.html',
  styleUrls: ['./video-center.component.css'],
  providers:[VideoService]
})
export class VideoCenterComponent implements OnInit {
  videos: Array<Video>


  selectedVideo: Video;
  private hidenewVideo:boolean = true;


  constructor(private _videoService: VideoService,private http: Http) { }

  ngOnInit() {
    this._videoService.getVideos()
    .subscribe(resVideoData => this.videos = resVideoData);
  }
  onSelectVideo(video:any){
    this.selectedVideo = video;
    this.hidenewVideo=true;
    console.log(this.selectedVideo);
  }
  onSubmitAddVideo(video:Video){
    this._videoService.addVideo(video)
      .subscribe(resNewVideo => {
        this.videos.push(resNewVideo);
        this.selectedVideo = resNewVideo;
      });
  }
    onUpdateVideoEvent(video:any){
    this._videoService.updateVideo(video)
    .subscribe(resUpdatedVideo => video = resUpdatedVideo);
    this.selectedVideo = null;
  };
  newVideo(){
    this.hidenewVideo =false;

  }

  updateContent(){

this._videoService.updateVideo(this.videos)
  }
}
