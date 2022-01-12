# normadist
A lightweight TypeScript package used to model **Normal Distributions**.

## ⬇️ Installing

For the latest stable version:

```bash
npm install normadist
```

## 🔎 API

In this section is presented hwo to use our library concisely.

### First Steps to use the Normal Distribution

To use a normal distribution the library user can do the right below little piece of code.

If it has been using `JavaScript`

```javascript
const { NormalDistribution } = require('normadist');

// Instantiating the standard normal distribution.
const distribution = NormalDistribution.standard();

// Printing the cumulative distribution function evaluated at 0.2
console.log(distribution.cdf(0.2));
```

If it has been using `TypeScript`

```typescript
import { NormalDistribution } from 'normadist';

// Instantiating the standard normal distribution.
const distribution = NormalDistribution.standard();

// Printing the cumulative distribution function evaluated at 0.2
console.log(distribution.cdf(0.2));
```

### Class Members

It will be shown the *class members* that the `NormalDistribution` class provides for the users.

- `mean`: The mean of the normal distribution.
- `standardDeviation`: The standard deviation of the normal distribution. That value must be a **positive number**.
- `erf`: An approximation for the **error function**. The library already provides one, however, the library user can choose one of its preference. Nevertheless, the wrong implementation for that error function approximation can lead errors for the values returned by the functions, since most of the functions use in its implementations the error function.

### Class Methods

It will be shown the *class methods* that the `NormalDistribution` class provides for the users.

#### #pdf(x)

The `pdf` stands for *probability density function* that when is evaluated at a point `x` returns the probability of the normal random variable `X` takes the value `x`.

<p align="center"><img style="width: 300px; height: auto" src="https://i.imgur.com/ry5W2QC.png" /></p>

#### #cdf(x)

The `cdf` stands for *cumulative distribution function* that when is evaluated at a point `x` returns the value that represents the area below the probability density function from `-Infinity` to `x`.

<p align="center"><img style="width: 250px; height: auto" src="https://i.imgur.com/YiaIHhP.png" /></p>

#### #ppf(x[, ierfc])

The `ppf` stands for *percent point function* that represents the `inverse cumulative distribution function`, then when it is evaluated at a point `x` the value returned represents the point at the horizontal axis, such that, all area below the probability density function at left of that value is `x`.

<p align="center"><img style="width:300px; height: auto" src="https://i.imgur.com/OMOJMgg.png" /></p>

:warning: **Warning**: The second parameter `ierfc` is already implemented by default. However, the user can choose one of its preferece. Altough, the wrong implementation of the inverse of complementary error function can lead to errors.

#### #between(startInterval, endInterval)

The `between` returns the value of the probability of the normal distributed random variable `X` take one of the values in the real, closed interval `[startInterval, endInterval]`.

<p align="center"><img style="width:400px; height: auto" src="https://i.imgur.com/hzKT0J7.png" /></p>

#### #standardize(x)

The `standardize` receives a value `x` and returns the standardized value `z`.

#### #random(x)

The `random` returns a random generated number in that normal distribution.

:bulb: **Behind the scenes**: This random number generator uses the <a href="https://en.wikipedia.org/wiki/Marsaglia_polar_method" target="_blank">Marsaglia Polar Method</a>.

#### #variance()

The `variance` returns the `variance` of that normal distribution.

#### *static* #standard([erf])

Returns a `standard normal distribution`, that is, the normal distribution with `mean` equals to **0** and `standard deviation` equals to **1**.

:warning: **Warning**: There is the `erf` parameter that is implemented by default, that represents the error function approximation. However, the user can choose one of its preference. Altough, the wrong implementation of the error function can lead to errors.

#### *static* #of(mean, standardDeviation[, erf])

Returns a `normal distribution` with specified `mean` and `standardDeviation`. Further, the user can still specify the implementation of the error function. However, this it is not *recommended*.
