
# pipettingbot-ui

> Uma explicação sobre o uso e as decisões a cerca da interface e o controle da máquina através da tal.

- [Uso](#uso)
- [Interface](#interface)
  - [node-webkit](#node-webkit)
  - [AngularJS](#angularjs)
  - [node-serialport](#node-serialport)
- [Hardware](#hardware)
  - [Pinagem](#pinagem)
    - [Preparando o Arduino](#preparando-o-arduino)

## Uso

Para utilizar a interface é necessário instalar o mesmo (veja em README.md) e possuir uma máquina Open Pipetting Bot.

Tendo isto, conecte a mesma em seu computador (através de alguma entrada USB) e então abra a Interface.

Se a configuração (o controlador estiver OK) não apresentar problemas, a máquina aparecerá então, no *Home*, como conectada.

Basta então ir para o menu de configuração de máquina, configurar a mesma, e então preparar seu experimento com os modelos de arquivos de entrada disponíveis no site!

## Interface

A interface com o usuário é estabelecida através de duas partes: o **arquivo** `.xlsx`, onde, seguindo um template, o usuário da máquina descreve seu experimento, e a **interface** propriamente dita, a qual contém a configuração da ḿáquina, recebe e interpreta arquivos `.xlsx` e exibe status da máquina.

Majoritariamente foi utilizado: [node-webkit](https://github.com/rogerwang/node-webkit), [angularjs](https://github.com/angular/angular.js), [node-serialport](https://github.com/voodootikigod/node-serialport).

Abaixo descrevemos o motivo da utilização de cada um destes citados:

### node-webkit

> app runtime based on Chromium and node.js.

Trata-se do principal componente da interface. É o responsável por transformar nossa aplicação (em grande parte, web) em uma aplicação desktop que pode ser exportada para Windows, Linux e MAC OSX (portabilidade é um grande ponto).

Conseguimos, com este, ter um desenvolvimento rápido da interface e utilizar da linguagem mais conhecida em todo o mundo: javascript.

### AngularJS

AngularJS facilita o desenvolvimento de aplicações "de uma página só", isto é, aplicações cuja navegação é feita sem alterar certas partes da página, mas apenas o relevante. Trata-se do responsável por dar um "flow" à aplicação e tornar mais interativo.

Com este temos a possibilidade de facilmente manter uma representação de estado da máquina praticamente em 'tempo real'.

### node-serialport

Permite a comunicação serial de nossa aplicação com o controlador. É a peça principal referente à comunicação com o [arduino](http://www.arduino.cc/) através da interface. É usado indiretamente pois um módulo que abstrai a interação com a máquina foi desenvolvida (https://github.com/cirocosta/yaspm).

## Hardware

A configuração do hardware trata-se da seguinte:

-	2x NEMA17 bipolar 4kgf
-	1x arduino uno
-	2x driver A4988
-	2x capacitores 100uF
-	2x resistores 100kO
-	1x fonte 12v

Para o controle da máquina utilizamos o [Arduino UNO](http://arduino.cc/en/Main/arduinoBoardUno) como controlador, conectado a dois drivers A4988 para estabelecer o controle sobre os motores (NEMA17). No arduino utilizamos o hexa do [GRBL](https://github.com/grbl/grbl) forkado para funcionar com o sistema de movimentação [CoreXY](http://corexy.com/theory.html) (https://github.com/zanderbier/grbl).

A conexão dos motores com o Arduino segue o seguinte esquema:

![Imgur](http://i.imgur.com/e5WNh0F.jpg)

### Pinagem

O mapeamento dos Pins do arduino/motores está todo descrito no arquivo `pin_map.h` do repositório [open-pipetting/grbl](https://github.com/open-pipetting/grbl):

```c
#define X_STEP_BIT         2  // Uno Digital Pin 2
#define Y_STEP_BIT         3  // Uno Digital Pin 3
#define Z_STEP_BIT         4  // Uno Digital Pin 4
#define X_DIRECTION_BIT    5  // Uno Digital Pin 5
#define Y_DIRECTION_BIT    6  // Uno Digital Pin 6
#define Z_DIRECTION_BIT    7  // Uno Digital Pin 7
```

sendo utilizados apenas os *X* e *Y*.

Com esta configuração o firmware (grbl) passa então a conseguir entender e traduzir os comandos GCODE enviados a ele através da interface.

#### Preparando o Arduino

Para que o Arduino possa, de maneira correta, controlar a máquina, é necessário que o mesmo contenha o firmware (grbl). Para isto basta seguir o procedimento elucidado na documentação do mesmo - que pode ser obtida [na wiki do projeto original](https://github.com/grbl/grbl/wiki/Flashing-Grbl-to-an-Arduino).

Feito isso, basta passar a enviar comandos para o mesmo - através da interface ou diretamente por meios de comunicação serial. (veja mais [aqui](https://github.com/grbl/grbl/wiki/Using-Grbl)).


