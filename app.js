 new Vue({
     el: "#app",
     data: {
         player_heal: 100,
         monster_heal: 100,
         game_is_on: false,
         logs: []
     },
     methods: {
         startGame: function() {
             this.game_is_on = true;
             this.startBtn = false;
         },
         attack: function() {
             let monsterPoint = Math.ceil(Math.random() * 10 + 1);
             this.monster_heal -= monsterPoint;
             this.monsterAttack();
             this.add_to_logs({
                 turn: "p",
                 text: "SƏNİN ATAKIN: (" + monsterPoint + ")"
             })
         },
         monsterAttack: function() {
             let playerPoint = Math.ceil(Math.random() * 15 + 1);
             this.player_heal -= playerPoint;
             this.add_to_logs({
                 turn: "m",
                 text: "MONSTER İN ATAKI: (" + playerPoint + ")"
             })
         },
         specialAttack: function() {
             let monsterPoint = Math.ceil(Math.random() * 25 + 1);
             this.monster_heal -= monsterPoint;
             this.monsterAttack()
             this.add_to_logs({
                 turn: "p",
                 text: "ÖZƏL ATAK: (" + monsterPoint + ")"
             })
         },
         heal: function() {
             let playerPoint = Math.ceil(Math.random() * 20 + 1);
             this.player_heal += playerPoint;
             this.monsterAttack();
             this.add_to_logs({
                 turn: "p",
                 text: "ILK YARDIM: (" + playerPoint + ")"
             })
         },
         giveUp: function() {
             this.player_heal = 0;
             this.add_to_logs({
                 turn: "p",
                 text: "OYUNÇU IMTINA ETTI"
             })
         },
         add_to_logs: function(log) {
             this.logs.push(log)
         }
     },
     watch: {
         player_heal: function(value) {
             if (value <= 0) {
                 this.player_heal = 0;
                 if (confirm("OYUNU UDUZDUN. Təkrar oynamağ istəyirsən?")) {
                     this.player_heal = 100;
                     this.monster_heal = 100;
                     this.logs = [];
                 }
             } else if (value >= 100) {
                 this.player_heal = 100;
             }
         },
         monster_heal: function(value) {
             if (value <= 0) {
                 this.monster_heal = 0;
                 if (confirm("OYUNU QAZANDIN. Təkrar oynamağ istəyirsən?")) {
                     this.player_heal = 100;
                     this.monster_heal = 100;
                     this.logs = [];
                 }
             }
         }
     }
 });