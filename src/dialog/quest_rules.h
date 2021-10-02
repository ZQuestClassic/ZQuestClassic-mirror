#ifndef ZC_DIALOG_QRS_H
#define ZC_DIALOG_QRS_H

#include <gui/dialog.h>
#include <gui/text_field.h>
#include <gui/list_data.h>
#include <functional>
#include <string_view>

#define QR_SZ QUESTRULES_NEW_SIZE

class QRDialog: public GUI::Dialog<QRDialog>
{
public:
	enum class message { OK, CANCEL, TOGGLE_QR };

	QRDialog(byte const* qrs, size_t qrs_per_tab, std::function<void(byte*)> setQRs);

	std::shared_ptr<GUI::Widget> view() override;
	bool handleMessage(message msg, GUI::MessageArg messageArg);

private:
	std::function<void(byte*)> setQRs;
	byte local_qrs[QR_SZ];
	size_t qrs_per_tab;
};

#endif

