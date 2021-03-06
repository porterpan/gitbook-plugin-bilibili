/**********************************************************************************************************************
 * Copyright 2011-2016 Cassius Cai <cassiuscai@gmail.com>                                                             *
 *                                                                                                                    *
 * Licensed under the Apache License, Version 2.0 (the "License");                                                    *
 * you may not use this file except in compliance with the License.                                                   *
 * You may obtain a copy of the License at                                                                            *
 *                                                                                                                    *
 *     http://www.apache.org/licenses/LICENSE-2.0                                                                     *
 *                                                                                                                    *
 * Unless required by applicable law or agreed to in writing, software                                                *
 * distributed under the License is distributed on an "AS IS" BASIS,                                                  *
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.                                           *
 * See the License for the specific language governing permissions and                                                *
 * limitations under the License.                                                                                     *
 **********************************************************************************************************************/
module.exports = {
    blocks: {
        bilibili: {
            process: function (block) {
                var replaced = block.body.replace('av', '').trim();
                var video = replaced;
                var mode = 'html5';
                var width = 544;
                var height = 415;
                var section = 1;
                var wrongParameter = false;
                if (replaced.indexOf('@') > 0) {
                    var pair = replaced.split('@');
                    video = pair[0].trim();
                    var size = pair[1].split('x');
                    width = size[0].trim();
                    height = size[1].trim();
                    if(pair.size > 2) {
                      section = pair[2].trim();
                      mode = pair[3].trim();
                      if (mode != 'flash' && mode != 'html5') {
                        wrongParameter = true;
                      }
                    }
                }

                var url = "https://www.bilibili.com/video/av" + video + "/?br";

                if (this.generator != "website") {
                    return '<p><a href="' + url + '">Video link</a></p>';
                }

                var result = '<div style="position: relative;padding-bottom: 56.25%;padding-top: 25px;height: 0;">'
                if (!wrongParameter) {
                    if (mode == 'flash') {
                        result = result + '<embed height="' + height + '" width="' + width + '" quality="high" allowfullscreen="true" type="application/x-shockwave-flash" src="https://static.hdslb.com/miniloader.swf" flashvars="page=' + section + '&aid=' + video + '" pluginspage="http://www.adobe.com/shockwave/download/download.cgi?P1_Prod_Version=ShockwaveFlash"></embed>'
                    } else {
                        result = result + '<iframe height="' + height + '" width="' + width + '" src="https://player.bilibili.com/player.html?aid=' + video + '&page=' + section + '" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true"> </iframe>'
                    }
                }
                result = result + '</div>';
                return result;
            }
        }
    }
};
