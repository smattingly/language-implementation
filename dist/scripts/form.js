var a8_0x31a1=['interpret','<h2>Program\x20output</h2><pre>','output','</pre>','\x20</pre>','message','Start\x20over','code','value','getElementById','useRegex','<h2>Lexemes</h2><ol>','getLexeme','<li>Source:\x20<code>','token','</code></li>','</ol>','result','innerHTML','regexControl','style','hidden','runButton','Run\x20parser','parse','<h2>Parse\x20tree</h2><p><code>','</code></p>','Interpret\x20the\x20program','onclick','program'];(function(_0xd46230,_0x18b84f){var _0x1ef012=function(_0x267628){while(--_0x267628){_0xd46230['push'](_0xd46230['shift']());}};_0x1ef012(++_0x18b84f);}(a8_0x31a1,0x1ab));var a8_0x5d71=function(_0x4d1d8a,_0x4876f7){_0x4d1d8a=_0x4d1d8a-0x0;var _0xa5cc27=a8_0x31a1[_0x4d1d8a];return _0xa5cc27;};let lexer,parser;function runLexer(){let _0xaa848b=document['getElementById'](a8_0x5d71('0x0'))[a8_0x5d71('0x1')];let _0xda7da0=document[a8_0x5d71('0x2')](a8_0x5d71('0x3'))['checked'];lexer=new Lexer();lexer['lex'](_0xaa848b,_0xda7da0);let _0x208434=a8_0x5d71('0x4');for(let _0x3688da=lexer[a8_0x5d71('0x5')]();_0x3688da!=null;_0x3688da=lexer[a8_0x5d71('0x5')]()){_0x208434=_0x208434+a8_0x5d71('0x6')+_0x3688da['source']+'</code><br>Token:\x20<code>'+_0x3688da[a8_0x5d71('0x7')]+a8_0x5d71('0x8');}_0x208434=_0x208434+a8_0x5d71('0x9');document[a8_0x5d71('0x2')](a8_0x5d71('0xa'))[a8_0x5d71('0xb')]=_0x208434;document[a8_0x5d71('0x2')](a8_0x5d71('0xc'))[a8_0x5d71('0xd')]['visibility']=a8_0x5d71('0xe');let _0x20f0fc=document[a8_0x5d71('0x2')](a8_0x5d71('0xf'));_0x20f0fc[a8_0x5d71('0xb')]=a8_0x5d71('0x10');_0x20f0fc['onclick']=runParser;}function runParser(){parser=new Parser();try{parser[a8_0x5d71('0x11')](lexer);}catch(_0x5bbf3f){startOver(_0x5bbf3f);return;}document[a8_0x5d71('0x2')]('result')['innerHTML']=a8_0x5d71('0x12')+parser['getParseTreeAsHtml']()+a8_0x5d71('0x13');let _0x41a6ef=document[a8_0x5d71('0x2')]('runButton');_0x41a6ef[a8_0x5d71('0xb')]=a8_0x5d71('0x14');_0x41a6ef[a8_0x5d71('0x15')]=interpretProgram;}function interpretProgram(){parser[a8_0x5d71('0x16')][a8_0x5d71('0x17')]();let _0x38729c=a8_0x5d71('0x18')+parser[a8_0x5d71('0x16')][a8_0x5d71('0x19')]+a8_0x5d71('0x1a');document[a8_0x5d71('0x2')](a8_0x5d71('0xa'))[a8_0x5d71('0xb')]=_0x38729c;let _0x5b6349=document[a8_0x5d71('0x2')](a8_0x5d71('0xf'));_0x5b6349[a8_0x5d71('0xb')]='Compile\x20the\x20program';_0x5b6349[a8_0x5d71('0x15')]=compileProgram;}function compileProgram(){parser['program']['compile']();let _0x507552='<h2>Program\x20translation</h2><pre>'+parser['program']['translation']+a8_0x5d71('0x1b');document[a8_0x5d71('0x2')]('result')[a8_0x5d71('0xb')]=_0x507552;startOver();}function startOver(_0x1b1fe4){if(_0x1b1fe4){document[a8_0x5d71('0x2')](a8_0x5d71('0xa'))['innerHTML']='<h2>Syntax\x20error</h2><p><code>'+_0x1b1fe4[a8_0x5d71('0x1c')]+a8_0x5d71('0x13');}let _0xcd2b60=document[a8_0x5d71('0x2')]('runButton');_0xcd2b60['innerHTML']=a8_0x5d71('0x1d');_0xcd2b60['onclick']=function(){location['reload']();};}