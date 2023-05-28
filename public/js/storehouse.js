/**
 * Storehouse.js
 * wrapper for session storage and local storage
 * @author Hideaki Tanabe
 * @see https://github.com/tanabe/Storehouse-js
 */
(function() {
  var localStorage = window.localStorage;
  var sessionStorage = window.sessionStorage;

  /**
   * check Storehouse is available
   * @name isAvailable
   * @function
   * @return boolean
   */
  var isAvailable = function() {
    return !!sessionStorage && !!localStorage && !!JSON;
  };

  /**
   * create storage key
   * @name createKey
   * @function
   * @param namespace namespace [String]
   * @param key key [String]
   * @return storage key [String]
   */
  var createKey = function(namespace, key) {
    return getMD5Hash([namespace, key].join("-"));
  };

  /**
   * retrieve item from storage
   * @name getItem
   * @function
   * @param namespace namespace [String]
   * @param key key [String]
   * @return value
   */
  var getItem = function(namespace, key) {
    var storageKey = createKey(namespace, key);
    var item = JSON.parse(sessionStorage.getItem(storageKey)) || JSON.parse(localStorage.getItem(storageKey));

    if (!item) {
      return undefined;
    }

    var value = item.value;
    var expire = Number(item.expire);
    var current = (new Date()).getTime();

    if (expire) {
      if (expire > current) {
        return value;
      } else {
        deleteItem(namespace, key);
      }
    } else {
      return value;
    }

    return undefined;
  };

  /**
   * set item into storage
   * @name setItem
   * @function
   * @param namespace namespace [String]
   * @param key key [String]
   * @param value value
   * @param expire expire [Date]
   */
  var setItem = function(namespace, key, value, expire) {
    var item = {
      namespace: namespace,
      key: key,
      value: value
    };

    if (expire) {
      item.expire = expire.getTime();
      localStorage.setItem(createKey(namespace, key), JSON.stringify(item));
    } else {
      sessionStorage.setItem(createKey(namespace, key), JSON.stringify(item));
    }
  };

  /**
   * delete item from storage
   * @name deleteItem
   * @function
   * @param namespace namespace [String]
   * @param key key [String]
   */
  var deleteItem = function(namespace, key) {
    sessionStorage.removeItem(createKey(namespace, key));
    localStorage.removeItem(createKey(namespace, key));
  };

  /**
   * create Storehouse instance with specified namespace
   * @name getInstance
   * @function
   * @param namespace specified namespace [String]
   */
  var getInstance = function(namespace) {
    return {
      getItem: function(key) {
        return getItem(namespace, key);
      },

      setItem: function(key, value, expire) {
        setItem(namespace, key, value, expire);
      },

      deleteItem: function(key) {
        deleteItem(namespace, key);
      }
    }
  };

  var getMD5Hash = function(rawData) {
    /* md5.js - MD5 Message-Digest
     * Copyright (C) 1999,2002 Masanao Izumo <iz@onicos.co.jp>
     * Version: 2.0.0
     * LastModified: May 13 2002
     *
     * This program is free software.  You can redistribute it and/or modify
     * it without any warranty.  This library calculates the MD5 based on RFC1321.
     * See RFC1321 for more information and algorism.
     */
    var MD5_T=new Array(0x00000000,0xd76aa478,0xe8c7b756,0x242070db,0xc1bdceee,0xf57c0faf,0x4787c62a,0xa8304613,0xfd469501,0x698098d8,0x8b44f7af,0xffff5bb1,0x895cd7be,0x6b901122,0xfd987193,0xa679438e,0x49b40821,0xf61e2562,0xc040b340,0x265e5a51,0xe9b6c7aa,0xd62f105d,0x02441453,0xd8a1e681,0xe7d3fbc8,0x21e1cde6,0xc33707d6,0xf4d50d87,0x455a14ed,0xa9e3e905,0xfcefa3f8,0x676f02d9,0x8d2a4c8a,0xfffa3942,0x8771f681,0x6d9d6122,0xfde5380c,0xa4beea44,0x4bdecfa9,0xf6bb4b60,0xbebfbc70,0x289b7ec6,0xeaa127fa,0xd4ef3085,0x04881d05,0xd9d4d039,0xe6db99e5,0x1fa27cf8,0xc4ac5665,0xf4292244,0x432aff97,0xab9423a7,0xfc93a039,0x655b59c3,0x8f0ccc92,0xffeff47d,0x85845dd1,0x6fa87e4f,0xfe2ce6e0,0xa3014314,0x4e0811a1,0xf7537e82,0xbd3af235,0x2ad7d2bb,0xeb86d391);var MD5_round1=new Array(new Array(0,7,1),new Array(1,12,2),new Array(2,17,3),new Array(3,22,4),new Array(4,7,5),new Array(5,12,6),new Array(6,17,7),new Array(7,22,8),new Array(8,7,9),new Array(9,12,10),new Array(10,17,11),new Array(11,22,12),new Array(12,7,13),new Array(13,12,14),new Array(14,17,15),new Array(15,22,16));var MD5_round2=new Array(new Array(1,5,17),new Array(6,9,18),new Array(11,14,19),new Array(0,20,20),new Array(5,5,21),new Array(10,9,22),new Array(15,14,23),new Array(4,20,24),new Array(9,5,25),new Array(14,9,26),new Array(3,14,27),new Array(8,20,28),new Array(13,5,29),new Array(2,9,30),new Array(7,14,31),new Array(12,20,32));var MD5_round3=new Array(new Array(5,4,33),new Array(8,11,34),new Array(11,16,35),new Array(14,23,36),new Array(1,4,37),new Array(4,11,38),new Array(7,16,39),new Array(10,23,40),new Array(13,4,41),new Array(0,11,42),new Array(3,16,43),new Array(6,23,44),new Array(9,4,45),new Array(12,11,46),new Array(15,16,47),new Array(2,23,48));var MD5_round4=new Array(new Array(0,6,49),new Array(7,10,50),new Array(14,15,51),new Array(5,21,52),new Array(12,6,53),new Array(3,10,54),new Array(10,15,55),new Array(1,21,56),new Array(8,6,57),new Array(15,10,58),new Array(6,15,59),new Array(13,21,60),new Array(4,6,61),new Array(11,10,62),new Array(2,15,63),new Array(9,21,64));function MD5_F(x,y,z){return(x&y)|(~x&z)}function MD5_G(x,y,z){return(x&z)|(y&~z)}function MD5_H(x,y,z){return x^y^z}function MD5_I(x,y,z){return y^(x|~z)}var MD5_round=new Array(new Array(MD5_F,MD5_round1),new Array(MD5_G,MD5_round2),new Array(MD5_H,MD5_round3),new Array(MD5_I,MD5_round4));function MD5_pack(n32){return String.fromCharCode(n32&0xff)+String.fromCharCode((n32>>>8)&0xff)+String.fromCharCode((n32>>>16)&0xff)+String.fromCharCode((n32>>>24)&0xff)}function MD5_unpack(s4){return s4.charCodeAt(0)|(s4.charCodeAt(1)<<8)|(s4.charCodeAt(2)<<16)|(s4.charCodeAt(3)<<24)}function MD5_number(n){while(n<0)n+=4294967296;while(n>4294967295)n-=4294967296;return n}function MD5_apply_round(x,s,f,abcd,r){var a,b,c,d;var kk,ss,ii;var t,u;a=abcd[0];b=abcd[1];c=abcd[2];d=abcd[3];kk=r[0];ss=r[1];ii=r[2];u=f(s[b],s[c],s[d]);t=s[a]+u+x[kk]+MD5_T[ii];t=MD5_number(t);t=((t<<ss)|(t>>>(32-ss)));t+=s[b];s[a]=MD5_number(t)}function MD5_hash(data){var abcd,x,state,s;var len,index,padLen,f,r;var i,j,k;var tmp;state=new Array(0x67452301,0xefcdab89,0x98badcfe,0x10325476);len=data.length;index=len&0x3f;padLen=(index<56)?(56-index):(120-index);if(padLen>0){data+="\x80";for(i=0;i<padLen-1;i++)data+="\x00"}data+=MD5_pack(len*8);data+=MD5_pack(0);len+=padLen+8;abcd=new Array(0,1,2,3);x=new Array(16);s=new Array(4);for(k=0;k<len;k+=64){for(i=0,j=k;i<16;i++,j+=4){x[i]=data.charCodeAt(j)|(data.charCodeAt(j+1)<<8)|(data.charCodeAt(j+2)<<16)|(data.charCodeAt(j+3)<<24)}for(i=0;i<4;i++)s[i]=state[i];for(i=0;i<4;i++){f=MD5_round[i][0];r=MD5_round[i][1];for(j=0;j<16;j++){MD5_apply_round(x,s,f,abcd,r[j]);tmp=abcd[0];abcd[0]=abcd[3];abcd[3]=abcd[2];abcd[2]=abcd[1];abcd[1]=tmp}}for(i=0;i<4;i++){state[i]+=s[i];state[i]=MD5_number(state[i])}}return MD5_pack(state[0])+MD5_pack(state[1])+MD5_pack(state[2])+MD5_pack(state[3])}function MD5_hexhash(data){var i,out,c;var bit128;bit128=MD5_hash(data);out="";for(i=0;i<16;i++){c=bit128.charCodeAt(i);out+="0123456789abcdef".charAt((c>>4)&0xf);out+="0123456789abcdef".charAt(c&0xf)}return out}
    return MD5_hexhash(rawData);
  };

  //define interfaces
  window.Storehouse = window.Storehouse || {
    isAvailable: isAvailable,
    getItem: getItem,
    setItem: setItem,
    deleteItem: deleteItem,
    getInstance: getInstance
  };
})();
