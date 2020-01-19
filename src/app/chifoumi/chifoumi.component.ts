import { Component, OnInit, OnDestroy } from '@angular/core';
import * as tmImage from '@teachablemachine/image';
import { SocketService } from '../services/socket.service';
import { Socket } from 'ngx-socket-io';
import { Router } from '@angular/router';

@Component({
  selector: 'app-chifoumi',
  templateUrl: './chifoumi.component.html',
  styleUrls: ['./chifoumi.component.css']
})
export class ChifoumiComponent implements OnInit, OnDestroy {

  // the link to your model provided by Teachable Machine export panel
  techableURL = 'https://teachablemachine.withgoogle.com/models/Db6Q6aVW/';

  model;
  webcam: tmImage.Webcam = new tmImage.Webcam(200, 200, true);
  labelContainer;
  predictContainer;
  maxPredictions;
  predictedClassName = '';
  selectedMove = 'Vide';

  playerScore: number;
  opponentScore: number;
  timer = 5;
  loading = true;
  waitingServer = false;
  showRoundResult = false;
  roundResult = '';
  interval: any;

  constructor(
    private socketService: SocketService,
    private socket: Socket,
    private router: Router) { }

  ngOnInit() {
    this.playerScore = 0;
    this.opponentScore = 0;
    this.init();
    this.initSocket();
    this.waitInit();
  }

  ngOnDestroy() {
    clearInterval(this.interval);
    this.socket.removeListener('endRound');
  }

  initSocket() {
    this.socket.on('endRound', (result: string) => {
      this.roundResult = result.toLocaleUpperCase();
      if (result === 'win') {
        this.playerScore++;
      } else if (result === 'loose') {
        this.opponentScore++;
      }
      this.waitingServer = false;
      if (this.playerScore >= 2 || this.opponentScore >= 2) {
        this.socketService.gameEnded();
        return;
      }
      this.displayResult();
    });
  }

  waitInit() {
    setTimeout(() => {
      if (this.webcam.webcam) {
        this.startRound();
        this.loading = false;
      } else {
        this.waitInit();
      }
    }, 1000);
  }

  startRound() {
    this.timer = 5;
    this.interval = setInterval(() => {
      this.timer -= 1;
      if (this.timer === 0) {
        clearInterval(this.interval);
        this.endTurn();
      }
    }, 1000);
  }

  endTurn() {
    this.socketService.sendMove(this.selectedMove);
    this.waitingServer = true;
    this.selectedMove = 'Vide';
  }

  displayResult() {
    this.showRoundResult = true;
    setTimeout(() => {
      this.showRoundResult = false;
      this.startRound();
    }, 5000);
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
    // const flip = true; // whether to flip the webcam
    // this.webcam = new tmImage.Webcam(200, 200, flip); // width, height, flip
    await this.webcam.setup(); // request access to the webcam
    await this.webcam.play();
    window.requestAnimationFrame(this.loop.bind(this));

    // append elements to the DOM
    document.getElementById('webcam-container').appendChild(this.webcam.canvas);
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

    let predictedValue = 0;
    prediction.forEach(x => {
      if (x.probability > predictedValue) {
        this.predictedClassName = x.className;
        predictedValue = x.probability;
        // If not waiting info from socket and move is not empty
        // Save the current player's move
        if (!this.waitingServer && this.predictedClassName !== 'Vide') {
          this.selectedMove = this.predictedClassName;
        }
      }
    });
  }

  goHome() {
    this.router.navigateByUrl('/home');
  }

}
