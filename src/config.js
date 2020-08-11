"use strict";

require('dotenv').config()

// Configuration variables
const port       = process.env.PORT        || '5000';
const mongoURI   = process.env.MONGODB_URI || 'mongodb://localhost:27010/communitydb';
const JwtSecret  = process.env.JWT_SECRET  || 'very secret secret';
const webserver  = process.env.WEBSERVER   || 'http://localhost:3000';
const sockjsURL  = process.env.sockjsURL   || 'http://cdn.jsdelivr.net/sockjs/1.0.1/sockjs.min.js';
const email      = process.env.EMAIL
const password   = process.env.PASSWORD
const badgeImage = process.env.badgeImage  || 'iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAMAAACahl6sAAAC3FBMVEVHcEz59ef+/PgiCQokCAohCQosDwxpWVEuEAru4cIQAwL6+vkfBwYzEBHZtmj+/fv8+/ret3ZvOz39/Ps1DgX39fD89NL9/Prsyo2+llTw6Nvz583isFz49/REDAP+/frWwpf11X7t06ZCDQShjWrGt5rbzKv+/fqLIAg0Kxr9+vH0zGj59+/9+/rm1pTr3cPvu2DdqlTxw2/m4dN6HQdBEAjDv7HOmUq3mWvq4sp5NgdIEwTtvmxnWTvrxIR/Gwd1VkOsn36blH92HAn7+NwxEQxJSTx0Ggd/IAbc1MBCFwq1q5k5CgXc1MXDvbCah279/ft0Y0N7dmORcDbmxmHf2suLelT8/Pm1k1ZmVj7BuqqonofuxHavpZHNycL148LrwG23llvdp0ryxmnp0KLdwqG5PwDnYgDty4LGr3qJelmtRQDaokVGCgBBCQBKCgCNHwf///w7BwBOCwD/8YH6uEr//uD//vT/2HcoAwD/6nr//urgpkT/8Yn/4nz//7D//soyBQD//tb/3nP/x2KHHwjztEqSIgn//6P//73ZoEH/53IcAQDSm0Dtr0j/9JL+wVn/4GTKljz/0Gn+5Ip9GQb//5b//Yr/2Gz+vVHoq0WxhDlTDQH/5GqHFQL35Lf/+Jz3vVYmHA3utVP/1V788ML+8q+4iUK/k0fivXj28+vUqFrz1Jm9oXB8ThyKe1rGmk7nuGmpfTb72IqVOxRgEQTkrU3btG/68t7JqXX+7JCaIwl9b1Cjcy5uFgXBkDzNoVCUg2j96qFvZkniw4VDOCb73aViPxbo17aWURSYayi6dzVIJgvszHi5mWOyaCKKYSP8zHO9iTWfXhu5qobXoEzRtHnUr2bv4KTKpmmsVB+Yd0plKwQKBQPDn2PiqB+vjlcmFGpdWUnIeCGulmxqTCrJto3XhySDamzJhERVRCjykyV+YjQrIT62q5isgkhbRmxINGs6J2r3xxIVyMHQAAAA73RSTlMACQQTCQYOAQMCGQ8gKxEWHgYcLzpI/Sb+Hvz9/jqDVP7+/kz+NP5n/P+Q/bB6/f3+/f31vmZs/l3e/uSB+2bPXv7+hNC3+6Pli6KVz6r4QMjQ+vf9w8Drm4bGu9rd+8TCx5ygq5iV0LbP6c/R/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////nEVBEkAACFaSURBVHja7Jn/UxNnHsc3KRgzXE1oJIkJgRADDAIERFFQO+KpFhVtr+fdtWe9q73R3vXuh8zIbsfNQWZlMoIlZcCxCDezA0wAYkIIcSDpkIvBGKIVUEAAUYYpQDseA//CfZ7dBFTxbqZ1/aW+ByAEZndfz/v9+TxfwLA3eqM3eqNfmAQreiXXEgqFr+RSP4FCGNbPZoEr8VkJXzMKi8GP3P1njqUAXYmHxKC8Tg7hKkWE5aeTIA5eDCvEIniNfrAYvLBeRBGspZdQxMbGAoZIjCQCFLjUa8UAgPAgwjDyYhmtB/2PghEI1j+v8J/yY0QyiUoikQHKa/GEGVnh0xgoDHDf528tjI2Oiopa9xardVFR0dFrP92G43lHkPLy4kAqCUMi5PD5IThhzyELKE9Cfow4OTn5+PG9SNsTEn595syZQwdA2744e/bsF+/tYnR3V0HBe+j10aNHt207dPjwoYSEhO3bN2/evHHj27/a+7u/ORyOm9/7F0Kh/IzM1MQ4RMKVJZEGBS/XvbWBh97i8d5OOHzg6K5bT/r75+c7kIZmZ4dGQLdHhmZ/+M8Ps7PfzYKGGKG3wxp5+PB2wfXr1wv+/Y+vHoOamtLS0rQtFUaKwqUZDAlYwkkTDkcJW3/8yB8/+c3BgwcOf7R3E7943/e9jt6pmbnpySyabikru3jlm/MXaqsbzYYa77179+54vd47jOAH4LznbRj2+dp27NjxICc+3unsGbPPLM7fPHjwZtqtQFlfBYW7cRzfn5qokol4nPRgpjnyYrC4E1Z9rv9W2vzM+MBA+591epwgcaklGLTJbVkBz2BbgxfGveDRo0d3//Wo4DrjUsd8P5jw8Dq8+aig4zaY1tDaOd4j72tpccnlAXtvodpvb8rKmgkqcxUkQeBUBlgC2eIABDiYui4m9OS+tKZF19cDv00q/efXl120NGVpaXRpISCXt/eMX7vR2dba0OWF0Ud+IB+Y76ARr3e4psrQ3Fhed+nclYtlFUYjReLt7WNjDu3o4PJ0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'

module.exports = {
    port,
    mongoURI,
    JwtSecret,
    email,
    password,
    webserver,
    badgeImage
};
