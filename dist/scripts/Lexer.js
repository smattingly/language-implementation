var a3_0x1878=['matchIdentifier','token','identifier','close_paren','assignment_operator','number','unrecognized','isLetter','lexemes','inComment','lexemeIndex','extractNextLexemeWithRegex','extractNextLexemeWithoutRegex','substr','source','length','checkToken','open_comment','tokens','close_comment','white_space','push','\x20\x09\x0d\x0a','()=*/','substring','indexOf','start','end','print'];(function(_0x5b5138,_0x412279){var _0x3d530a=function(_0x5bfea9){while(--_0x5bfea9){_0x5b5138['push'](_0x5b5138['shift']());}};_0x3d530a(++_0x412279);}(a3_0x1878,0x181));var a3_0x2bce=function(_0x2f91d2,_0x58c32e){_0x2f91d2=_0x2f91d2-0x0;var _0x531ef5=a3_0x1878[_0x2f91d2];return _0x531ef5;};class Lexer{constructor(){this[a3_0x2bce('0x0')]=[];this[a3_0x2bce('0x1')]=![];this[a3_0x2bce('0x2')]=0x0;}['lex'](_0x12a1a3,_0x212fe4){while(_0x12a1a3['length']>0x0){let _0x4ac9c1;if(_0x212fe4){_0x4ac9c1=this[a3_0x2bce('0x3')](_0x12a1a3);}else{_0x4ac9c1=this[a3_0x2bce('0x4')](_0x12a1a3);}_0x12a1a3=_0x12a1a3[a3_0x2bce('0x5')](_0x4ac9c1[a3_0x2bce('0x6')][a3_0x2bce('0x7')]);if(_0x4ac9c1[a3_0x2bce('0x8')](Lexeme['tokens'][a3_0x2bce('0x9')])){this['inComment']=!![];}else if(_0x4ac9c1[a3_0x2bce('0x8')](Lexeme[a3_0x2bce('0xa')][a3_0x2bce('0xb')])){this[a3_0x2bce('0x1')]=![];}else if(!_0x4ac9c1[a3_0x2bce('0x8')](Lexeme[a3_0x2bce('0xa')][a3_0x2bce('0xc')])&&!this['inComment']){this['lexemes'][a3_0x2bce('0xd')](_0x4ac9c1);}}}['extractNextLexemeWithRegex'](_0x3008c6){let _0x2934c3=null;for(let _0xdb4287 in Lexeme['tokens']){let _0x2cfe29=_0x3008c6['match'](Lexeme[a3_0x2bce('0xa')][_0xdb4287]);if(_0x2cfe29){_0x2934c3=new Lexeme(_0x2cfe29[0x0],_0xdb4287);break;}}return _0x2934c3;}['extractNextLexemeWithoutRegex'](_0x23ec04){const _0x2babf5=a3_0x2bce('0xe');const _0x4d9255=_0x2babf5+a3_0x2bce('0xf');let _0x10da87=new Lexeme();while(_0x23ec04[a3_0x2bce('0x7')]>0x0){let _0x10d9de=_0x23ec04[a3_0x2bce('0x10')](0x0,0x1);if(_0x4d9255[a3_0x2bce('0x11')](_0x10d9de)<0x0){_0x10da87[a3_0x2bce('0x6')]=_0x10da87[a3_0x2bce('0x6')]+_0x10d9de;_0x23ec04=_0x23ec04['substring'](0x1);}else{if(_0x10da87[a3_0x2bce('0x6')][a3_0x2bce('0x7')]===0x0){_0x10da87[a3_0x2bce('0x6')]=_0x10d9de;let _0x580355=_0x23ec04[a3_0x2bce('0x10')](0x1,0x2);if(_0x10da87[a3_0x2bce('0x6')]==='/'&&_0x580355==='*'||_0x10da87['source']==='*'&&_0x580355==='/'){_0x10da87[a3_0x2bce('0x6')]=_0x10da87[a3_0x2bce('0x6')]+_0x580355;}}else if(_0x10da87[a3_0x2bce('0x6')][a3_0x2bce('0x7')]===0x1&&_0x2babf5[a3_0x2bce('0x11')](_0x10da87[a3_0x2bce('0x6')][a3_0x2bce('0x10')](0x0,0x1))===0x0){while(_0x23ec04[a3_0x2bce('0x7')]>0x0&&_0x2babf5['indexOf'](_0x23ec04['substring'](0x0,0x1))>=0x0){_0x10da87[a3_0x2bce('0x6')]=_0x10da87[a3_0x2bce('0x6')]+_0x23ec04[a3_0x2bce('0x10')](0x0,0x1);_0x23ec04=_0x23ec04[a3_0x2bce('0x10')](0x1);}}break;}}if(_0x10da87['source']===a3_0x2bce('0x12')||_0x10da87[a3_0x2bce('0x6')]===a3_0x2bce('0x13')||_0x10da87[a3_0x2bce('0x6')]===a3_0x2bce('0x14')){_0x10da87['token']=_0x10da87[a3_0x2bce('0x6')];}else if(this[a3_0x2bce('0x15')](_0x10da87[a3_0x2bce('0x6')])){_0x10da87[a3_0x2bce('0x16')]=a3_0x2bce('0x17');}else if(_0x10da87[a3_0x2bce('0x6')]==='('){_0x10da87['token']='open_paren';}else if(_0x10da87[a3_0x2bce('0x6')]===')'){_0x10da87[a3_0x2bce('0x16')]=a3_0x2bce('0x18');}else if(_0x10da87[a3_0x2bce('0x6')]==='='){_0x10da87[a3_0x2bce('0x16')]=a3_0x2bce('0x19');}else if(_0x10da87[a3_0x2bce('0x6')]==='/*'){_0x10da87[a3_0x2bce('0x16')]=a3_0x2bce('0x9');}else if(_0x10da87['source']==='*/'){_0x10da87['token']='close_comment';}else if(_0x2babf5[a3_0x2bce('0x11')](_0x10da87[a3_0x2bce('0x6')][a3_0x2bce('0x10')](0x0,0x1))>=0x0){_0x10da87['token']=a3_0x2bce('0xc');}else if(!isNaN(_0x10da87['source'])){_0x10da87['token']=a3_0x2bce('0x1a');}else{_0x10da87[a3_0x2bce('0x16')]=a3_0x2bce('0x1b');}return _0x10da87;}[a3_0x2bce('0x15')](_0x32ca03){let _0x32994d=_0x32ca03[a3_0x2bce('0x10')](0x0,0x1);if(!this[a3_0x2bce('0x1c')](_0x32994d))return![];_0x32ca03=_0x32ca03[a3_0x2bce('0x10')](0x1);while(_0x32ca03[a3_0x2bce('0x7')]>0x0){_0x32994d=_0x32ca03[a3_0x2bce('0x10')](0x0,0x1);_0x32ca03=_0x32ca03[a3_0x2bce('0x10')](0x1);if(!this['isLetter'](_0x32994d)&&isNaN(_0x32994d)&&_0x32994d!=='_'){return![];}}return!![];}[a3_0x2bce('0x1c')](_0x33e7ff){return _0x33e7ff>='a'&&_0x33e7ff<='z'||_0x33e7ff>='A'&&_0x33e7ff<='Z';}['getLexeme'](_0x57dfb5){if(this['lexemeIndex']>=this[a3_0x2bce('0x0')][a3_0x2bce('0x7')]){this[a3_0x2bce('0x2')]=0x0;return null;}return this[a3_0x2bce('0x0')][_0x57dfb5===![]?this[a3_0x2bce('0x2')]:this[a3_0x2bce('0x2')]++];}}