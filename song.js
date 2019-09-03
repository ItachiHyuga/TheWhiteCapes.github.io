 /* Blob.js
  * A Blob implementation.
  * 2013-06-20
  * 
  * By Eli Grey, http://eligrey.com
  * By Devin Samarin, https://github.com/eboyjr
  * Modified by Marcus Geelnard (2013-07-06) to support really large blobs
  * License: X11/MIT
  *   See LICENSE.md
  */

 /*global self, unescape */
 /*jslint bitwise: true, regexp: true, confusion: true, es5: true, vars: true, white: true,
   plusplus: true */

 /*! @source http://purl.eligrey.com/github/Blob.js/blob/master/Blob.js */

 if (typeof Blob !== "function" || typeof URL === "undefined")
   if (typeof Blob === "function" && typeof webkitURL !== "undefined") var URL = webkitURL;
   else var Blob = (function (view) {
     "use strict";

     var BlobBuilder = view.BlobBuilder || view.WebKitBlobBuilder || view.MozBlobBuilder || view.MSBlobBuilder || (function (view) {
       var
         get_class = function (object) {
           return Object.prototype.toString.call(object).match(/^\[object\s(.*)\]$/)[1];
         },
         FakeBlobBuilder = function BlobBuilder() {
           this.data = [];
         },
         FakeBlob = function Blob(data, type, encoding) {
           this.data = data;
           this.size = data.length;
           this.type = type;
           this.encoding = encoding;
         },
         FBB_proto = FakeBlobBuilder.prototype,
         FB_proto = FakeBlob.prototype,
         FileReaderSync = view.FileReaderSync,
         FileException = function (type) {
           this.code = this[this.name = type];
         },
         file_ex_codes = (
           "NOT_FOUND_ERR SECURITY_ERR ABORT_ERR NOT_READABLE_ERR ENCODING_ERR " +
           "NO_MODIFICATION_ALLOWED_ERR INVALID_STATE_ERR SYNTAX_ERR"
         ).split(" "),
         file_ex_code = file_ex_codes.length,
         real_URL = view.URL || view.webkitURL || view,
         real_create_object_URL = real_URL.createObjectURL,
         real_revoke_object_URL = real_URL.revokeObjectURL,
         URL = real_URL,
         btoa = view.btoa,
         atob = view.atob,
         can_apply_typed_arrays = false,
         can_apply_typed_arrays_test = function (pass) {
           can_apply_typed_arrays = !pass;
         }

         ,
         ArrayBuffer = view.ArrayBuffer,
         Uint8Array = view.Uint8Array;
       FakeBlob.fake = FB_proto.fake = true;
       while (file_ex_code--) {
         FileException.prototype[file_ex_codes[file_ex_code]] = file_ex_code + 1;
       }
       try {
         if (Uint8Array) {
           can_apply_typed_arrays_test.apply(0, new Uint8Array(200 * 44100 * 4));
         }
       } catch (ex) {}
       if (!real_URL.createObjectURL) {
         URL = view.URL = {};
       }
       URL.createObjectURL = function (blob) {
         var
           type = blob.type,
           data_URI_header;
         if (type === null) {
           type = "application/octet-stream";
         }
         if (blob instanceof FakeBlob) {
           data_URI_header = "data:" + type;
           if (blob.encoding === "base64") {
             return data_URI_header + ";base64," + blob.data;
           } else if (blob.encoding === "URI") {
             return data_URI_header + "," + decodeURIComponent(blob.data);
           }
           if (btoa) {
             return data_URI_header + ";base64," + btoa(blob.data);
           } else {
             return data_URI_header + "," + encodeURIComponent(blob.data);
           }
         } else if (real_create_object_URL) {
           return real_create_object_URL.call(real_URL, blob);
         }
       };
       URL.revokeObjectURL = function (object_URL) {
         if (object_URL.substring(0, 5) !== "data:" && real_revoke_object_URL) {
           real_revoke_object_URL.call(real_URL, object_URL);
         }
       };
       FBB_proto.append = function (data /*, endings*/ ) {
         var bb = this.data;
         // decode data to a binary string
         if (Uint8Array && (data instanceof ArrayBuffer || data instanceof Uint8Array)) {
           if (can_apply_typed_arrays) {
             bb.push(String.fromCharCode.apply(String, new Uint8Array(data)));
           } else {
             var
               str = "",
               buf = new Uint8Array(data),
               i = 0,
               buf_len = buf.length;
             for (; i < buf_len; i++) {
               str += String.fromCharCode(buf[i]);
             }
             bb.push(str);
           }
         } else if (get_class(data) === "Blob" || get_class(data) === "File") {
           if (FileReaderSync) {
             var fr = new FileReaderSync;
             bb.push(fr.readAsBinaryString(data));
           } else {
             // async FileReader won't work as BlobBuilder is sync
             throw new FileException("NOT_READABLE_ERR");
           }
         } else if (data instanceof FakeBlob) {
           if (data.encoding === "base64" && atob) {
             bb.push(atob(data.data));
           } else if (data.encoding === "URI") {
             bb.push(decodeURIComponent(data.data));
           } else if (data.encoding === "raw") {
             bb.push(data.data);
           }
         } else {
           if (typeof data !== "string") {
             data += ""; // convert unsupported types to strings
           }
           // decode UTF-16 to binary string
           bb.push(unescape(encodeURIComponent(data)));
         }
       };
       FBB_proto.getBlob = function (type) {
         if (!arguments.length) {
           type = null;
         }
         return new FakeBlob(this.data.join(""), type, "raw");
       };
       FBB_proto.toString = function () {
         return "[object BlobBuilder]";
       };
       FB_proto.slice = function (start, end, type) {
         var args = arguments.length;
         if (args < 3) {
           type = null;
         }
         return new FakeBlob(
           this.data.slice(start, args > 1 ? end : this.data.length), type, this.encoding
         );
       };
       FB_proto.toString = function () {
         return "[object Blob]";
       };
       return FakeBlobBuilder;
     }(view));

     return function Blob(blobParts, options) {
       var type = options ? (options.type || "") : "";
       var builder = new BlobBuilder();
       if (blobParts) {
         for (var i = 0, len = blobParts.length; i < len; i++) {
           builder.append(blobParts[i]);
         }
       }
       return builder.getBlob(type);
     };
   }(self));

 //player.js
 "use strict";
 var CPlayer = function () {
   var osc_sin = function (value) {
     return Math.sin(value * 6.283184)
   };
   var osc_saw = function (value) {
     return 2 * (value % 1) - 1
   };
   var osc_square = function (value) {
     return (value % 1) < 0.5 ? 1 : -1
   };
   var osc_tri = function (value) {
     var v2 = (value % 1) * 4;
     if (v2 < 2) return v2 - 1;
     return 3 - v2
   };
   var getnotefreq = function (n) {
     return 0.003959503758 * Math.pow(2, (n - 128) / 12)
   };
   var createNote = function (instr, n, rowLen) {
     var osc1 = mOscillators[instr.i[0]],
       o1vol = instr.i[1],
       o1xenv = instr.i[3],
       osc2 = mOscillators[instr.i[4]],
       o2vol = instr.i[5],
       o2xenv = instr.i[8],
       noiseVol = instr.i[9],
       attack = instr.i[10] * instr.i[10] * 4,
       sustain = instr.i[11] * instr.i[11] * 4,
       release = instr.i[12] * instr.i[12] * 4,
       releaseInv = 1 / release,
       arp = instr.i[13],
       arpInterval = rowLen * Math.pow(2, 2 - instr.i[14]);
     var noteBuf = new Int32Array(attack + sustain + release);
     var c1 = 0,
       c2 = 0;
     var j, j2, e, t, rsample, o1t, o2t;
     for (j = 0, j2 = 0; j < attack + sustain + release; j++, j2++) {
       if (j2 >= 0) {
         arp = (arp >> 8) | ((arp & 255) << 4);
         j2 -= arpInterval;
         o1t = getnotefreq(n + (arp & 15) + instr.i[2] - 128);
         o2t = getnotefreq(n + (arp & 15) + instr.i[6] - 128) * (1 + 0.0008 * instr.i[7])
       }
       e = 1;
       if (j < attack) {
         e = j / attack
       } else if (j >= attack + sustain) {
         e -= (j - attack - sustain) * releaseInv
       }
       t = o1t;
       if (o1xenv) {
         t *= e * e
       }
       c1 += t;
       rsample = osc1(c1) * o1vol;
       t = o2t;
       if (o2xenv) {
         t *= e * e
       }
       c2 += t;
       rsample += osc2(c2) * o2vol;
       if (noiseVol) {
         rsample += (2 * Math.random() - 1) * noiseVol
       }
       noteBuf[j] = (80 * rsample * e) | 0
     }
     return noteBuf
   };
   var mOscillators = [osc_sin, osc_square, osc_saw, osc_tri];
   var mSong, mLastRow, mCurrentCol, mNumWords, mMixBuf;
   this.init = function (song) {
     mSong = song;
     mLastRow = song.endPattern;
     mCurrentCol = 0;
     mNumWords = song.rowLen * song.patternLen * (mLastRow + 1) * 2;
     mMixBuf = new Int32Array(mNumWords)
   };
   this.generate = function () {
     var i, j, b, p, row, col, n, cp, k, t, lfor, e, x, rsample, rowStartSample, f, da;
     var chnBuf = new Int32Array(mNumWords),
       instr = mSong.songData[mCurrentCol],
       rowLen = mSong.rowLen,
       patternLen = mSong.patternLen;
     var low = 0,
       band = 0,
       high;
     var lsample, filterActive = !1;
     var noteCache = [];
     for (p = 0; p <= mLastRow; ++p) {
       cp = instr.p[p];
       for (row = 0; row < patternLen; ++row) {
         var cmdNo = cp ? instr.c[cp - 1].f[row] : 0;
         if (cmdNo) {
           instr.i[cmdNo - 1] = instr.c[cp - 1].f[row + patternLen] || 0;
           if (cmdNo < 16) {
             noteCache = []
           }
         }
         var oscLFO = mOscillators[instr.i[15]],
           lfoAmt = instr.i[16] / 512,
           lfoFreq = Math.pow(2, instr.i[17] - 9) / rowLen,
           fxLFO = instr.i[18],
           fxFilter = instr.i[19],
           fxFreq = instr.i[20] * 43.23529 * 3.141592 / 44100,
           q = 1 - instr.i[21] / 255,
           dist = instr.i[22] * 1e-5,
           drive = instr.i[23] / 32,
           panAmt = instr.i[24] / 512,
           panFreq = 6.283184 * Math.pow(2, instr.i[25] - 9) / rowLen,
           dlyAmt = instr.i[26] / 255,
           dly = instr.i[27] * rowLen & ~1;
         rowStartSample = (p * patternLen + row) * rowLen;
         for (col = 0; col < 4; ++col) {
           n = cp ? instr.c[cp - 1].n[row + col * patternLen] : 0;
           if (n) {
             if (!noteCache[n]) {
               noteCache[n] = createNote(instr, n, rowLen)
             }
             var noteBuf = noteCache[n];
             for (j = 0, i = rowStartSample * 2; j < noteBuf.length; j++, i += 2) {
               chnBuf[i] += noteBuf[j]
             }
           }
         }
         for (j = 0; j < rowLen; j++) {
           k = (rowStartSample + j) * 2;
           rsample = chnBuf[k];
           if (rsample || filterActive) {
             f = fxFreq;
             if (fxLFO) {
               f *= oscLFO(lfoFreq * k) * lfoAmt + 0.5
             }
             f = 1.5 * Math.sin(f);
             low += f * band;
             high = q * (rsample - band) - low;
             band += f * high;
             rsample = fxFilter == 3 ? band : fxFilter == 1 ? high : low;
             if (dist) {
               rsample *= dist;
               rsample = rsample < 1 ? rsample > -1 ? osc_sin(rsample * .25) : -1 : 1;
               rsample /= dist
             }
             rsample *= drive;
             filterActive = rsample * rsample > 1e-5;
             t = Math.sin(panFreq * k) * panAmt + 0.5;
             lsample = rsample * (1 - t);
             rsample *= t
           } else {
             lsample = 0
           }
           if (k >= dly) {
             lsample += chnBuf[k - dly + 1] * dlyAmt;
             rsample += chnBuf[k - dly] * dlyAmt
           }
           chnBuf[k] = lsample | 0;
           chnBuf[k + 1] = rsample | 0;
           mMixBuf[k] += lsample | 0;
           mMixBuf[k + 1] += rsample | 0
         }
       }
     }
     mCurrentCol++;
     return mCurrentCol / mSong.numChannels
   };
   this.createWave = function () {
     var headerLen = 44;
     var l1 = headerLen + mNumWords * 2 - 8;
     var l2 = l1 - 36;
     var wave = new Uint8Array(headerLen + mNumWords * 2);
     wave.set([82, 73, 70, 70, l1 & 255, (l1 >> 8) & 255, (l1 >> 16) & 255, (l1 >> 24) & 255, 87, 65, 86, 69, 102, 109, 116, 32, 16, 0, 0, 0, 1, 0, 2, 0, 68, 172, 0, 0, 16, 177, 2, 0, 4, 0, 16, 0, 100, 97, 116, 97, l2 & 255, (l2 >> 8) & 255, (l2 >> 16) & 255, (l2 >> 24) & 255]);
     for (var i = 0, idx = headerLen; i < mNumWords; ++i) {
       var y = mMixBuf[i];
       y = y < -32767 ? -32767 : (y > 32767 ? 32767 : y);
       wave[idx++] = y & 255;
       wave[idx++] = (y >> 8) & 255
     }
     return wave
   };
   this.getData = function (t, n) {
     var i = 2 * Math.floor(t * 44100);
     var d = new Array(n);
     for (var j = 0; j < 2 * n; j += 1) {
       var k = i + j;
       d[j] = t > 0 && k < mMixBuf.length ? mMixBuf[k] / 32768 : 0
     }
     return d
   }
 }

 function startDemo() {
   //----------------------------------------------------------------------------
   // Music data section
   //----------------------------------------------------------------------------

   // Song data
   var song = {
     songData: [{
       i: [0, 91, 128, 0, 0, 95, 128, 12, 0, 0, 12, 0, 72, 0, 0, 0, 0, 0, 0, 2, 255, 0, 0, 32, 83, 3, 130, 4],
       p: [4, 4],
       c: [{
         n: [144, , 147, , 151, , , , , , 144, , , , , , 144, , 147, , 151, , , , , , 144],
         f: []
       }, {
         n: [],
         f: []
       }, {
         n: [],
         f: []
       }, {
         n: [144, 147, 144, 147, 142, 147, 142, 147, 140, 147, 140, 147, 140, 142, 144, 146, 144, 147, 144, 147, 142, 147, 142, 147, 140, 147, 140, 147, 142, 144, 146, , 132, , 132, , 130, , 130, , 128, , 128, , 128, , , , 132, , 132, , 130, , 130, , 128, , 128, , 130, 132, 134, , , , , , , , , , , , , , , , , , 139, , 139, , 137, , 137, , 135, , 135, , 137, 140, 140],
         f: []
       }]
     }, {
       i: [2, 192, 128, 0, 2, 192, 140, 18, 0, 0, 158, 119, 158, 0, 0, 0, 0, 0, 0, 2, 5, 0, 0, 32, 0, 0, 24, 8],
       p: [11, 12],
       c: [{
         n: [],
         f: []
       }, {
         n: [],
         f: []
       }, {
         n: [],
         f: []
       }, {
         n: [],
         f: []
       }, {
         n: [],
         f: []
       }, {
         n: [],
         f: []
       }, {
         n: [],
         f: []
       }, {
         n: [],
         f: []
       }, {
         n: [],
         f: []
       }, {
         n: [],
         f: []
       }, {
         n: [, , , , , , , , , , , , , , , 144, , 144, , 144, , 142, , 142, 140, , 140, , 144, , 144, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , 139, , 139],
         f: []
       }, {
         n: [144, 144, 144, 144, 144, 142, 142, 142, 142, 140, 140, 140, 140, 144, , 144, , 144, , 144, , 142, , 142, , 140, , 140, , 144, , 144, , , , , , , , , , , , , , 139, , , , 132, , , , 130, , , , 128, , , , 132, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , 127, , 127],
         f: []
       }]
     }, ],
     rowLen: 22050,
     patternLen: 32,
     endPattern: 1,
     numChannels: 2
   }

   //----------------------------------------------------------------------------
   // Demo program section
   //----------------------------------------------------------------------------

   // Initialize music generation (player).
   var t0 = new Date();
   var player = new CPlayer();
   player.init(song);

   // Generate music...
   var done = false;
   setInterval(function () {
     if (done) {
       return;
     }


     done = player.generate() >= 1;

     if (done) {
       var t1 = new Date();
       

       // Put the generated song in an Audio element.
       var wave = player.createWave();
       var audio = document.createElement("audio");
       audio.src = URL.createObjectURL(new Blob([wave], {
         type: "audio/wav"
       }));
       audio.loop=true;
       audio.play();



     }
   }, 0);
 }