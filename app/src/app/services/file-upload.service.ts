import { Injectable } from "@angular/core";
import { Camera, CameraOptions } from "@ionic-native/camera/ngx";
import { File } from "@ionic-native/file/ngx";
import { HttpClient } from "@angular/common/http";
import { environment } from "./../../environments/environment";
import { PreviewAnyFile } from "@ionic-native/preview-any-file/ngx";
@Injectable({
  providedIn: "root",
})
export class FileUploadService {
  url = environment.url;
  constructor(
    private file: File,

    private camera: Camera,
    private http: HttpClient,
    private previewAnyFile: PreviewAnyFile
  ) {}

  async getCamera() {
    try {
      const options: CameraOptions = {
        quality: 100,
        sourceType: this.camera.PictureSourceType.CAMERA,
        destinationType: this.camera.DestinationType.FILE_URI,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE,
        correctOrientation: true,
      };

      let cameraInfo = await this.camera.getPicture(options);
      let blobInfo = await this.makeFileIntoBlob(cameraInfo);
      return blobInfo;
    } catch (e) {
      console.log(e.message);
      console.log("File Upload Error " + e.message);
    }
  }

  async getGallary() {
    try {
      const options: CameraOptions = {
        quality: 100,
        sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
        destinationType: this.camera.DestinationType.FILE_URI,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE,
        correctOrientation: true,
      };

      let cameraInfo = await this.camera.getPicture(options);
      console.log("Camera info", cameraInfo);
      let blobInfo = await this.makeFileIntoBlob(cameraInfo);

      return blobInfo;
    } catch (e) {
      console.log(e.message);
      console.log("File Upload Error " + e.message);
    }
  }

  // FILE STUFF
  makeFileIntoBlob(_imagePath) {
    // INSTALL PLUGIN - cordova plugin add cordova-plugin-file
    return new Promise((resolve, reject) => {
      let fileName = "";
      this.file
        .resolveLocalFilesystemUrl(_imagePath)
        .then((fileEntry) => {
          let { name, nativeURL } = fileEntry;

          // get the path..
          let path = nativeURL.substring(0, nativeURL.lastIndexOf("/"));
          console.log("path", path);
          console.log("fileName", name);

          fileName = name;

          // we are provided the name, so now read the file into
          // a buffer
          return this.file.readAsArrayBuffer(path, name);
        })
        .then((buffer) => {
          // get the buffer and make a blob to be saved
          let imgBlob: any = new Blob([buffer], {
            type: "image/jpeg",
          });
          console.log(imgBlob.type, imgBlob.size);
          imgBlob.name = name;
          resolve({
            fileName,
            imgBlob,
          });
        })
        .catch((e) => reject(e));
    });
  }

  uploadImage(file) {
    console.log(file);
    var formData = new FormData();

    formData.append("image", file.imgBlob, file.fileName);
    console.log(formData);
    return this.http.post<any>(`${this.url}/image/image-upload`, formData);
  }

  uploadFile(file) {
    console.log(file);
    var formData = new FormData();

    formData.append("doc", file.imgBlob, file.fileName);
    console.log(formData);
    return this.http.post<any>(`${this.url}/document/doc-upload`, formData);
  }

  makeDocFileIntoBlob(_imagePath, name, type) {
    // // INSTALL PLUGIN - cordova plugin add cordova-plugin-file
    // return new Promise((resolve, reject) => {
    //   window.resolveLocalFileSystemURL(_imagePath, (fileEntry) => {

    //     fileEntry.file((resFile) => {

    //       var reader = new FileReader();
    //       reader.onloadend = (evt: any) => {
    //         var imgBlob: any = new Blob([evt.target.result], { type: type });
    //         imgBlob.name = name;
    //         resolve(imgBlob);
    //       };

    //       reader.onerror = (e) => {
    //        alert('Failed file read: ' + e.toString());
    //         reject(e);
    //       };

    //       reader.readAsArrayBuffer(resFile);
    //     });
    //   });
    // });

    // INSTALL PLUGIN - cordova plugin add cordova-plugin-file
    return new Promise((resolve, reject) => {
      let fileName = "";
      this.file
        .resolveLocalFilesystemUrl(_imagePath)
        .then((fileEntry) => {
          let { name, nativeURL } = fileEntry;

          // get the path..
          let path = nativeURL.substring(0, nativeURL.lastIndexOf("/"));
          console.log("path", path);
          console.log("fileName", name);

          fileName = name;

          // we are provided the name, so now read the file into
          // a buffer
          return this.file.readAsArrayBuffer(path, name);
        })
        .then((buffer) => {
          let imgBlob: any = new Blob([buffer], { type: type });
          console.log(imgBlob.type, imgBlob.size);
          imgBlob.name = name;
          resolve({
            fileName,
            imgBlob,
          });
        })
        .catch((e) => reject(e));
    });
  }

  getfilename(filestring) {
    let file;
    file = filestring.replace(/^.*[\\\/]/, "");
    return file;
  }

  getfileext(filestring) {
    let file = filestring.substr(filestring.lastIndexOf(".") + 1);
    return file;
  }

  previewFile(url) {
    this.previewAnyFile
      .preview(url)
      .then((res: any) => console.log(res))
      .catch((error: any) => console.error(error));
  }

  async getFilesFromFolder(name) {
    let availableCheck = await this.file.listDir(
      this.file.externalRootDirectory,
      "Download"
    );
    if (availableCheck) {
      console.log(availableCheck);
      let available = availableCheck.find(
        (namesList) => namesList.name == name
      );
      if (available) {
        console.log("true available");
        return { isAvail: true, nativeUrl: available.nativeURL };
      } else {
        console.log("not available");
        return false;
      }
    } else return false;
  }
}
