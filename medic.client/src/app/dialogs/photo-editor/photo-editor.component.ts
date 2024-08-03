import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FileUploader, FileUploadModule} from "ng2-file-upload";
import {environment} from "../../../environments/environment.development";
import {Member} from "../../models/member";
import {AccountService} from "../../services/account.service";
import {take} from "rxjs";
import {DecimalPipe, NgClass, NgForOf, NgIf, NgStyle} from "@angular/common";
import {Photo} from "../../models/photo";


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
      }
    }
  }

  close() {
    this.dialogRef.close();
  }

  deletePhoto(id: number) {

  }

  setMainPhoto(photo: Photo) {

  }
}
