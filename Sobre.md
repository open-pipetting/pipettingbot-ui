# pipettingbot

## Interface

A interface com o usuário é estabelecida através de duas partes: o arquivo `.xlsx`, onde, seguindo um template, o usuário da máquina descreve seu experimento, e a interface da máquina, a qual contém a configuração da mesma, recebe e interpreta arquivos `.xlsx` e exibe status da máquina.

Majoritariamente foi utilizado: [node-webkit](https://github.com/rogerwang/node-webkit), [angularjs](https://github.com/angular/angular.js), [node-serialport](https://github.com/voodootikigod/node-serialport).

Abaixo descrevemos o motivo da utilização de cada um destes citados:

### node-webkit

> app runtime based on Chromium and node.js.

Trata-se do principal componente da interface. É o responsável por transformar nossa aplicação (em grande parte, web) em uma aplicação desktop que pode ser exportada para Windows, Linux e MAC OSX (portabilidade é um grande ponto).

### AngularJS

AngularJS facilita o desenvolvimento de aplicações "de uma página só", isto é, aplicações cuja navegação é feita sem alterar certas partes da página, mas apenas o relevante. Trata-se do responsável por dar um "flow" à aplicação e tornar mais interativo.

### node-serialport

Permite a comunicação serial de nossa aplicação com o controlador.

## Hardware

A configuração do hardware foi:

-	2x NEMA17 bipolar 4kgf
-	1x arduino uno
-	2x driver A4988
-	2x capacitores 100uF
-	2x resistores 100kO
-	1x fonte 12v

Para o controle da máquina utilizamos o arduino UNO como controlador, conectado a dois drivers A4988 para estabelecer o controle sobre os motores (NEMA17). No arduino utilizamos o hexa do [GRBL](https://github.com/grbl/grbl) forkado para funcionar com o sistema de movimentação [CoreXY](http://corexy.com/theory.html) (https://github.com/zanderbier/grbl).
