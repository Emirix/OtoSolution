# Thanks you for using Emirix's Spinner

This is my first library that i created.
ESpinner is simple and lightweight javascript library.

You can make loaders with library.

# How to use

Copy the `ESpinner ` folder into your `src` folder. ( /src/ESpinner )

In your `app.js` or other componets you have to import Espinner.

## How to import

```javascript
import ESpinner from "./Espinner/Spinner";
```

## How to use

```html
<ESpinner color="blue" />
```

## Props

| Name   | Value  | Required | Default |                                    Description |
| ------ | :----: | :------: | :-----: | ---------------------------------------------: |
| color  | string |    no    | "#222"  |                                Set's the color |
| speed  |  int   |    no    |   0.8   |                 Set's the turn speed (seconds) |
| double |  int   |    0     |    0    |              You want double border? Just try! |
| width  |  int   |    no    |    4    |                         Set's the border width |
| size   |  int   |    no    |   50    | Set's the width and height ( everytime square) |

# Example Code

```javascript
import ESpinner from "./Espinner/Spinner";
```

```html
<ESpinner color="#61dafb" size="100" width="5" speed="1" double />

<!-- Tip: you dont have to add this all props -->

<ESPinner />
<!-- This will be work with default settings -->
```

# About

Created by Emir Tanır

[Instagram](https://www.instagram.com/emirtnr355/)

`E-Mail:` emirtanir55@gmail.com
