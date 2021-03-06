# -*- coding: utf-8 -*-

from module.plugins.internal.MultiHook import MultiHook


class SimplydebridCom(MultiHook):
    __name__    = "SimplydebridCom"
    __type__    = "hook"
    __version__ = "0.03"

    __config__ = [("mode", "all;listed;unlisted", "Use for hosters (if supported)", "all"),
                  ("pluginlist", "str", "Hoster list (comma separated)", "")]

    __description__ = """Simply-Debrid.com hook plugin"""
    __license__     = "GPLv3"
    __authors__     = [("Kagenoshin", "kagenoshin@gmx.ch")]


    def getHosters(self):
        page = self.getURL("http://simply-debrid.com/api.php", get={'list': 1})
        return [x.strip() for x in page.rstrip(';').replace("\"", "").split(";")]
