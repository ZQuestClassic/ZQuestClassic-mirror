#include <allegro.h>
/* XPM */
static const char *allegico_xpm[] = {
/* columns rows colors chars-per-pixel */
"32 32 189 2 ",
"   c #130A0C",
".  c #130F11",
"X  c #131114",
"o  c #0F333B",
"O  c #0E444E",
"+  c #0D4C57",
"@  c #0B5D6B",
"#  c #0A6C7C",
"$  c #0B6271",
"%  c #087E91",
"&  c #09798B",
"*  c #4D5D8B",
"=  c #51578F",
"-  c #56698B",
";  c #59738E",
":  c #626AB5",
">  c #6A74B8",
",  c #16939E",
"<  c #209199",
"1  c #059AAD",
"2  c #1C9AA6",
"3  c #159EAB",
"4  c #059DB5",
"5  c #079EB8",
"6  c #089FB9",
"7  c #2C9BA3",
"8  c #239EAA",
"9  c #319EA7",
"0  c #05A2BC",
"q  c #0AA3BC",
"w  c #2FA1AB",
"e  c #38A5AE",
"r  c #2CA5B0",
"t  c #32ACB9",
"y  c #6382A4",
"u  c #42A8AF",
"i  c #44AAB1",
"p  c #56AFB6",
"a  c #4DB7BF",
"s  c #4BB1B7",
"d  c #53B3BA",
"f  c #59B2B9",
"g  c #6AB9BF",
"h  c #05A6C1",
"j  c #08A6C2",
"k  c #05A9C4",
"l  c #09ABC7",
"z  c #04AEC9",
"x  c #04B1CC",
"c  c #09B1CB",
"v  c #1AB4CC",
"b  c #05B4D2",
"n  c #08B4D1",
"m  c #07BDDC",
"M  c #08BEDD",
"N  c #06B8D7",
"B  c #1CBAD5",
"V  c #23B7CB",
"C  c #2BBCD3",
"Z  c #24B9D0",
"A  c #34BED4",
"S  c #7C86CF",
"D  c #4FB9C1",
"F  c #5ABDC3",
"G  c #57BAC3",
"H  c #6FBBC0",
"J  c #09C0DF",
"K  c #14C1DA",
"L  c #29C9DD",
"P  c #39C5DA",
"I  c #08C3E3",
"U  c #09CCEC",
"Y  c #18D0EF",
"T  c #09CFF1",
"R  c #09D1F3",
"E  c #09D6F9",
"W  c #0BDCFD",
"Q  c #15D7F2",
"!  c #2CC8E2",
"~  c #36CBE5",
"^  c #2CD0EC",
"/  c #0FE1FE",
"(  c #13E2FF",
")  c #1BE2FF",
"_  c #24E5FF",
"`  c #2CE6FF",
"'  c #31E6FE",
"]  c #3BE3FB",
"[  c #35E8FF",
"{  c #3BE8FF",
"}  c #5FC7CE",
"|  c #4DC6DA",
" . c #49C8D8",
".. c #57C9D8",
"X. c #57D0DE",
"o. c #66C3CA",
"O. c #6EC3C9",
"+. c #66CBD3",
"@. c #61CDDE",
"#. c #68CBD1",
"$. c #79CED5",
"%. c #7DD7DD",
"&. c #4ED8EA",
"*. c #5BDEF4",
"=. c #75D8E7",
"-. c #43E5FB",
";. c #43E9FF",
":. c #4CEAFF",
">. c #4FE5FD",
",. c #55EBFF",
"<. c #5DECFF",
"1. c #58E5FA",
"2. c #62ECFF",
"3. c #6AECFF",
"4. c #68E3F8",
"5. c #73EDFE",
"6. c #7BEFFF",
"7. c #75E2F3",
"8. c #7EF0FF",
"9. c #838ACD",
"0. c #8791C5",
"q. c #8991D3",
"w. c #969DD6",
"e. c #8BB4C5",
"r. c #A3B0CC",
"t. c #A0AFED",
"y. c #A2B0EB",
"u. c #ACBDF6",
"i. c #89CCD1",
"p. c #99CFD3",
"a. c #86D3D9",
"s. c #99D6DA",
"d. c #84C4C8",
"f. c #AAC1D3",
"g. c #A7D6DB",
"h. c #B3C5D7",
"j. c #84D9E4",
"k. c #8BDBE3",
"l. c #8FDDE9",
"z. c #94D9E0",
"x. c #A6DEE4",
"c. c #ABDDE1",
"v. c #B9C6F6",
"b. c #86E1EC",
"n. c #94E7ED",
"m. c #9BE4EC",
"M. c #83E4F4",
"N. c #82EDFD",
"B. c #89E9F8",
"V. c #90E5F3",
"C. c #9DE9F6",
"Z. c #90ECFB",
"A. c #9AEAF6",
"S. c #85F0FF",
"D. c #8CF1FF",
"F. c #94F2FF",
"G. c #9CF2FF",
"H. c #ABE3E7",
"J. c #A3E5EC",
"K. c #A8E9ED",
"L. c #B4E3E7",
"P. c #BFE6EA",
"I. c #B9E2E4",
"U. c #A9E6F1",
"Y. c #AAEAF3",
"T. c #A9EFFA",
"R. c #B5EDF6",
"E. c #BEECF4",
"W. c #B5EFF9",
"Q. c #BFEFF8",
"!. c #A4F3FF",
"~. c #ACF4FE",
"^. c #AEF0F5",
"/. c #B5F3FC",
"(. c #BFF2FA",
"). c #B7F8FD",
"_. c #C2CADD",
"`. c #C9D2DF",
"'. c #D0DDE5",
"]. c #C1E7E9",
"[. c #D7E9EE",
"{. c #CBEDF0",
"}. c #C9F0F7",
"|. c #C9F1F8",
" X c #C0F0F8",
".X c #D6F5F7",
"XX c #E3F9FB",
"oX c #F2FBFC",
"OX c None",
/* pixels */
"OXOXOXOXOXOXOXOXOXOXOXOXOXOXOXOXOXOXOXOXOXOXOXOXOXOXOXOXOXOXOXOX",
"OXOXOXOXOXOXOXOXOXOXOXOXOXOXOXOXOXOXOXOXOXOXOXOXOXOXOXOXOXOXOXOX",
"OXOXOXOXOXOXOXOXOXOXOXz c C ..@.X.| C c l OXOXOXOXOXOXOXOXOXOXOX",
"OXOXOXOXOXOXOXOXOXz A j. X}.}.}.}.}.}.E.=.C c OXOXOXOXOXOXOXOXOX",
"OXOXOXOXOXOXOXc Z l. X X(.(. X X X X X X XE.j.B OXOXOXOXOXOXOXOX",
"OXOXOXOXOXOXz | U.R.R././.).).W.P.]././././.R.U.P c OXOXOXOXOXOX",
"OXOXOXOXOXx ..U.Y.T.~.~.~.~.~.].g./.~.~.~.T.T.Y.U. .c OXOXOXOXOX",
"OXOXOXOXz C m.A.G.G.!.!.!.~.Y.I.c.!.!.!.!.!.G.A.U.l.C OXOXOXOXOX",
"OXOXOXOXz =.V.Z.Z.F.G.G.!.G.K.H.g.g.g.H.x.m.V.Z.Z.V.=.k OXOXOXOX",
"OXOXOXz B b.M.N.D.D.F.F.F.F.s.H.XX.X{.].L.H.i.S.N.M.M.B z OXOXOX",
"OXOXOXx ~ 7.5.6.S.S.D.D.F.Z.p..XoX_.`.'.[.XXd.N.6.5.7.P z OXOXOX",
"OXOXz b ~ 4.3.5.6.6.S.S.S.k.s.oXr.w.q.w.0..Xi.=.5.3.4.~ b z OXOX",
"OXOXz N ^ 1.2.3.3.6.6.6.6.$.H.h.9.t.v.t.> c.s.+.3.2.*.! b z OXOX",
"OXOXz m Y >.,.2.3.3.5.5.5.#.H.f.S u.v.0.: e.K.F <.,.X.v m z OXOX",
"OXOXx J T ;.:.,.<.2.3.3.3.} a.f.: : : * - s.Y.d 1.&.f c m x OXOX",
"OXOXx I R Q ;.:.,.,.<.<.<.X.O.E.y - * ; p.).).a.H g 2 U m x OXOX",
"OXOXx I R / ' ;.:.:.,.,.,...o.K.A.Y.K.k.a.n.n.n.o.w U T J z OXOX",
"OXOXx J R / ( [ ;.:.:.:. .p } < 7 s %.d t r r r V Q / U J z OXOX",
"OXOXz N U W ( _ ' { -. .p a w -.;.P t  .:.;.{ ' ) ( E U N x OXOX",
"OXOXz b U E ( ) ` ' P s a 2 ] -.;.;.;.;.{ [ ' _ ) ( E I x x OXOX",
"OXOXz z J R / ( _ L i a 2 ] { { { { { { [ [ ` _ ( W R m x OXOXOX",
"OXOXOXz n U E / L e #., ] [ { { { { [ [ ' ' _ ) ( E U n z OXOXOX",
"OXOXOXz k J Q K u K.} 3 ` ' [ [ [ [ ' ' ` _ ) ( E U m k z OXOXOX",
"OXOXOXOXz c c < $..X#., _ ` ' ' ' ` ` _ _ ) ( W R I k z OXOXOXOX",
"OXOXOXOXOXk h 1 7 a } < _ _ _ _ _ _ _ ) ( / E T I z k OXOXOXOXOX",
"OXOXOXOXOXk h k M V V q ( W ( ) ( ( ( ( W E T I j k k OXOXOXOXOX",
"OXOXOXOXOXOX& 0 0 b U R E E W W W W E E R I n 0 k $ OXOXOXOXOXOX",
"OXOXOXOXOXOXOXO 5 0 q n I U U R R R U I c q 0 4 o OXOXOXOXOXOXOX",
"OXOXOXOXOXOXOXOXX # 0 0 6 4 j l l j 6 6 0 0 @   OXOXOXOXOXOXOXOX",
"OXOXOXOXOXOXOXOXOXOX. + % 0 k h 0 k 4 & O   OXOXOXOXOXOXOXOXOXOX",
"OXOXOXOXOXOXOXOXOXOXOXOXOXOXOXOXOXOXOXOXOXOXOXOXOXOXOXOXOXOXOXOX",
"OXOXOXOXOXOXOXOXOXOXOXOXOXOXOXOXOXOXOXOXOXOXOXOXOXOXOXOXOXOXOXOX"
};
#if defined ALLEGRO_WITH_XWINDOWS && defined ALLEGRO_USE_CONSTRUCTOR
extern void *allegro_icon;
CONSTRUCTOR_FUNCTION(static void _set_allegro_icon(void));
static void _set_allegro_icon(void)
{
    allegro_icon = allegico_xpm;
}
#endif
