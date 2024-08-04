import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FileUploader, FileUploadModule} from "ng2-file-upload";
import {environment} from "../../../environments/environment.development";
import {Member} from "../../models/member";
import {AccountService} from "../../services/account.service";
import {take} from "rxjs";
import {DecimalPipe, NgClass, NgForOf, NgIf, NgStyle} from "@angular/common";
import {Photo} from "../../models/photo";
import {PhotoService} from "../../services/photo.service";
import {SharedService} from "../../services/shared.service";

@Component({
  selector: 'app-photo-editor',
  standalone: true,
  imports: [
    NgStyle,
    FileUploadModule,
    NgClass,
    DecimalPipe,
    NgForOf,
    NgIf
  ],
  templateUrl: './photo-editor.component.html',
  styleUrl: './photo-editor.component.css'
})
export class PhotoEditorComponent implements OnInit{
  uploader: FileUploader;
  hasBaseDropZoneOver = false;
  baseUrl = environment.apiUrl;
  member: Member;
  user: any;

  constructor(
    private accountService: AccountService,
    private photoService: PhotoService,
    private sharedService: SharedService,
    public dialogRef: MatDialogRef<PhotoEditorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { member: any }
  ) {
    this.member = data.member;
    this.initializeUploader();
  }

  ngOnInit() {
    this.accountService.currentUser$.pipe(take(1)).subscribe(user => {
      this.user = user;
      this.initializeUploader();
    });
  }

  fileOverBase(e: any) {
    this.hasBaseDropZoneOver = e;
  }

  initializeUploader() {
    this.uploader = new FileUploader({
      url: this.baseUrl + `Photo/Add-photo/${this.member.id}`,
      authToken: 'Bearer ' + (this.user?.token),
      isHTML5: true,
      allowedFileType: ['image'],
      removeAfterUpload: true,
      autoUpload: false,
      maxFileSize: 10 * 1024 * 1024
    });

    this.uploader.onAfterAddingFile = (file) => {
      file.withCredentials = false;
    }

    this.uploader.onSuccessItem = (_, response) => {
      if (response) {
        const photo = JSON.parse(response);
        this.member.photos.push(photo);
        this.sharedService.updateMember(this.member);
      }
    }
  }

  setMainPhoto(photo: Photo) {
    this.photoService.setMainPhoto(this.member.id, photo.id).subscribe({
      next: () => {
        if (this.member) {
          this.member.photoUrl = photo.url;
          this.member.photos.forEach(p => {
            p.isMain = p.id === photo.id;
          });
          this.sharedService.updateMember(this.member);
        }
      },
      error: (err) => {
        console.error('Error setting main photo:', err);
      }
    });
  }

  deletePhoto(photoId: number) {
    this.photoService.deletePhoto(this.member.id, photoId).subscribe(() => {
      this.member.photos = this.member.photos.filter(x => x.id !== photoId);
    })
  }
}
