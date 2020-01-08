import { Component, OnInit } from '@angular/core';
import * as tmImage from '@teachablemachine/image';

@Component({
  selector: 'app-chifoumi',
  templateUrl: './chifoumi.component.html',
  styleUrls: ['./chifoumi.component.css']
})
export class ChifoumiComponent implements OnInit {

  // the link to your model provided by Teachable Machine export panel
  techableURL = 'https://teachablemachine.withgoogle.com/models/Db6Q6aVW/';

  model;
  webcam: tmImage.Webcam;
  labelContainer;
  predictContainer;
  maxPredictions;
  predictedClassName = '';

  constructor() { }

  ngOnInit() {
  }

  // Load the image model and setup the webcam
  async init() {
    const modelURL = this.techableURL + 'model.json';
    const metadataURL = this.techableURL + 'metadata.json';

    // load the model and metadata
    // Refer to tmImage.loadFromFiles() in the API to support files from a file picker
    // or files from your local hard drive
    // Note: the pose library adds "tmImage" object to your window (window.tmImage)
    this.model = await tmImage.load(modelURL, metadataURL);
    this.maxPredictions = this.model.getTotalClasses();

    // Convenience function to setup a webcam
    const flip = true; // whether to flip the webcam
    this.webcam = new tmImage.Webcam(200, 200, flip); // width, height, flip
    await this.webcam.setup(); // request access to the webcam
    await this.webcam.play();
    window.requestAnimationFrame(this.loop.bind(this));

    // append elements to the DOM
    document.getElementById('webcam-container').appendChild(this.webcam.canvas);
    this.labelContainer = document.getElementById('label-container');
    for (let i = 0; i < this.maxPredictions; i++) { // and class labels
      this.labelContainer.appendChild(document.createElement('div'));
    }
  }


  async loop() {
    this.webcam.update(); // update the webcam frame
    await this.predict();
    window.requestAnimationFrame(this.loop.bind(this));
  }

  // run the webcam image through the image model
  async predict() {
      // predict can take in an image, video or canvas html element
    const prediction = await this.model.predict(this.webcam.canvas);
    for (let i = 0; i < this.maxPredictions; i++) {
        const classPrediction =
            prediction[i].className + ': ' + prediction[i].probability.toFixed(2);
        this.labelContainer.childNodes[i].innerHTML = classPrediction;
    }

    let predictedValue = 0;
    prediction.forEach(x => {
      if (x.probability > predictedValue) {
        this.predictedClassName = x.className;
        predictedValue = x.probability;
      }
    });
  }

}
