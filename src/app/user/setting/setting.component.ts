import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl
} from '@angular/forms';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.css']
})
export class SettingComponent implements OnInit {
  settingsFormGroup: FormGroup;
  showTutorialControl: FormControl = new FormControl(
    false,
    Validators.required
  );

  constructor(fb: FormBuilder) {
    // this.settingsFormGroup = fb.group({showTutorial: [false, Validators.required]});
    this.settingsFormGroup = fb.group({});
    this.settingsFormGroup.addControl('showTutorial', this.showTutorialControl);

    this.showTutorialControl.valueChanges.subscribe(
      x => console.log('change', x)
    );
  }

  ngOnInit() {}
}
