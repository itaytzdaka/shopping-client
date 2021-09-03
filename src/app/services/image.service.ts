import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(
    private http: HttpClient
  ) { }

  public uploadImageAsync(image: File) :Promise<File>{
    const formData = new FormData();
    formData.append('image', image, image.name);
    return this.http.post<File>("http://localhost:3000/api/upload-image", formData).toPromise();
    
  }

  public deleteImageAsync(imageName: string) : void{
    this.http.delete("http://localhost:3000/api/upload-image/"+ imageName).toPromise();
  }

}
