# jquery-hot-trends-bubbles

## Description
A jQuery plugin to display bubbles with sizes relative to topics relevance.

## Screenshots
![Alt text](/screenshots/screenshot01.png?raw=true "Screenshot 01")

## Author
Dhiogo Boza - dhiogoboza@gmail.com


## Contributing

[npm](https://www.npmjs.com) is used to build and test `jquery-hot-trends-bubbles`.

## Building

```
npm install
npm run build
```

Check `dist` folder for compiled code

## Testing

```
npm run test
```

## Usage

This plugins draw a relevance chart with bubbles representing topics provided by `data` argument.

```javascript
$("YOUR_SELECTOR").hotTrendsBubbles({
    data: "data", // data to draw the chart
    key: "name", // index from json objects that represents the topic
    value: "value", // index from json objects with numbers with the topics relevance
    onSelection: function (topic) {
        // event triggered when a option is selected
    }
});
```
