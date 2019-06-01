import { Component, OnInit, HostListener } from '@angular/core';
import { UsersService } from './services/users.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public usersPicturesAlbums: any = [];
  public filteredValue = '';
  public copyOfusersPicturesAlbums: any = [];
  public usersData: any = [];
  public picturesData: any = [];
  public picturesPosts: any = [];
  public albumsData: any = [];
  public userBoolean = true;
  public albumBoolean = false;
  public photosBoolean = false;
  public myFilterDropdown: any = [
    {name: 'users'},
    {name: 'albums'},
    {name: 'pictures'}
  ];
  constructor(private userData: UsersService) { }
  @HostListener('window:scroll', ['$event'])
  scrollHandler(event) {
      if (this.photosBoolean) {
        this.onScrollingPictures();
      }
    }

  ngOnInit(): void {
    this.getUserData('');

  }

  getUserData(val) {
    if (val === '' || val === 'users') {
        this.userData.fetchUsers().subscribe((data: {}) => {
          this.usersData = data;
          console.log('usersData received');
      });
    } else if (val === 'albums') {
      this.userData.fetchAlbums().subscribe((data: {}) => {
        this.albumsData = data;
        console.log('albumsData received');
      });
    } else if (val === 'pictures') {
      this.userData.fetchImages().subscribe((data: {}) => {
        this.picturesData = data;
        this.picturesPosts = this.picturesData.slice(0, 20);
        console.log('picturesData received');
      });
    }
  }

  onScrollingPictures() {
      if (this.picturesPosts.length < this.picturesData.length) {
        const len = this.picturesPosts.length;

        for (let i = len; i <= len + 20; i++) {
          this.picturesPosts.push(this.picturesData[i]);
        }
      }
  }

  filteredValueCaptured(val) {
    if (val === '' || val.name === 'users') {
      this.getUserData(val.name);
      this.userBoolean = true;
      this.albumBoolean = false;
      this.photosBoolean = false;
    } else if (val.name === 'albums') {
      this.getUserData(val.name);
      this.userBoolean = false;
      this.albumBoolean = true;
      this.photosBoolean = false;
    } else if (val.name === 'pictures') {
      this.getUserData(val.name);
      this.userBoolean = false;
      this.albumBoolean = false;
      this.photosBoolean = true;
    }
  }

}
