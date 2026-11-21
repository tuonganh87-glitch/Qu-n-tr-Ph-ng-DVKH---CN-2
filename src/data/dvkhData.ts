export type TeamId = 1 | 2 | 3;

export interface StaffTask {
  t: string;
  r: string;
}

export type RmPairing = [name: string, role: string, department: string];

export interface StaffMember {
  id: string;
  u: string;
  name: string;
  team: TeamId;
  role: string;
  lead?: boolean;
  quyhoach?: boolean;
  tag?: string;
  duty: string[];
  camp: string[];
  sup: string;
  bk: string;
  stt: number;
  tasks: StaffTask[];
  rm?: RmPairing[];
}

export interface TaskGridRow {
  t: string;
  c: [string[], string[], string[], string[]];
}

export interface CampaignSpearhead {
  team: TeamId;
  product: string;
  ownerId: string;
  leadId: string;
  notes: string;
}

export const TEAMS: Record<TeamId, { name: string; shortName: string; scope: string; headcount: number }> = {
  1: {
    name: 'Team 1 · Khối back và hỗ trợ',
    shortName: 'Team 1 · Hỗ trợ',
    scope: 'Kho quỹ, kế toán nội bộ, kế toán tài chính, tổ điện toán',
    headcount: 7,
  },
  2: {
    name: 'Team 2 · Giao dịch',
    shortName: 'Team 2 · Giao dịch',
    scope: 'Giao dịch tại quầy, kiểm soát chứng từ, tư vấn và bán chéo',
    headcount: 6,
  },
  3: {
    name: 'Team 3 · Giao dịch',
    shortName: 'Team 3 · Giao dịch',
    scope: 'Giao dịch tại quầy, chuyển tiền ngoại tệ, tư vấn và bán chéo',
    headcount: 5,
  },
};

export const STAFF: StaffMember[] = [
  {
    id: 'nguyet',
    u: 'nta.nguyet',
    name: 'Nguyễn Thị Ánh Nguyệt',
    team: 1,
    role: 'Phó Phụ trách Phòng Dịch vụ Khách hàng',
    lead: true,
    duty: [
      'Phụ trách chung: điều hành toàn bộ hoạt động Phòng DVKH, chịu trách nhiệm chung mọi vấn đề phát sinh; sắp xếp lịch trực kho tiền và lịch trực sau 17h.',
      'Kho quỹ: quản lý an toàn kho quỹ, thu chi tiền mặt, chìa khóa kho tiền và két, hồ sơ TSBĐ, giấy tờ có giá, ấn chỉ quan trọng.',
      'Điều hòa tiền mặt toàn chi nhánh, tiếp quỹ ATM, nộp lĩnh tiền với NHNN.',
      'Hệ thống CNTT: vận hành, bảo trì, đào tạo an toàn thông tin.',
      'Kế toán, tài chính: kiểm soát hạch toán, hậu kiểm, chi tiêu nội bộ, bảng cân đối, thuế GTGT trước ngày 20.',
      'Phê duyệt báo cáo NHNN theo Thông tư 35 trước ngày 15; đầu mối chuyển đổi số; quản trị dữ liệu và báo cáo chiết xuất; phụ trách chung chất lượng dịch vụ.',
      'Đào tạo, phát triển đội ngũ; phân bổ chỉ tiêu, lập kế hoạch bán hàng tại sảnh; quà sinh nhật, lễ tết cho khách hàng.',
      'Chỉ tiêu: nguồn vốn, CASA; chỉ số CX; văn hóa đổi mới sáng tạo.',
    ],
    camp: [
      'Chủ trì chiến dịch 5 mũi nhọn, chủ trì họp PDCA tuần.',
      'Ngày 1–5: chiết xuất dữ liệu khách hàng, phê duyệt danh sách, chỉ tiêu và đầu mối.',
      'Ngày 27–30: phê duyệt kết quả đã đối soát, chủ trì tổng kết và vinh danh.',
    ],
    sup: 'Phó Giám đốc phụ trách',
    bk: 'Trần Thị Huyền',
    stt: 1,
    tasks: [],
  },
  {
    id: 'tien',
    u: 'tienntt',
    name: 'Nguyễn Thanh Thủy Tiên',
    team: 1,
    role: 'Thủ kho',
    duty: [
      'Giao nhận, bảo quản, xuất nhập hồ sơ TSBĐ, giấy tờ có giá, ấn chỉ quan trọng theo quy định.',
      'Phối hợp kiểm kê ấn chỉ quan trọng hằng quý và kiểm kê định kỳ.',
      'Phối hợp điều phối tiền mặt giữa thủ kho và giao dịch viên.',
    ],
    camp: [
      'Không tham gia chiến dịch 5 mũi nhọn; tập trung bảo đảm vận hành an toàn, liên tục cho các team giao dịch.',
    ],
    sup: 'Nguyễn Thị Ánh Nguyệt',
    bk: 'Do Phó phụ trách phòng chỉ định theo quy định',
    stt: 2,
    tasks: [],
  },
  {
    id: 'tuoi',
    u: 'pttuoi',
    name: 'Phan Thị Tươi',
    team: 1,
    role: 'Thủ quỹ',
    duty: [
      'Thu chi, kiểm đếm tiền mặt; kiểm quỹ buổi trưa và cuối ngày.',
      'Phối hợp điều hòa tiền mặt với PGD, tiếp quỹ ATM, nộp lĩnh tiền với NHNN.',
      'Ghi chép sổ sách, mẫu biểu nghiệp vụ tiền tệ kho quỹ.',
    ],
    camp: [
      'Không tham gia chiến dịch 5 mũi nhọn; tập trung bảo đảm vận hành an toàn, liên tục cho các team giao dịch.',
    ],
    sup: 'Nguyễn Thị Ánh Nguyệt',
    bk: 'Do Phó phụ trách phòng chỉ định theo quy định',
    stt: 3,
    tasks: [],
  },
  {
    id: 'phong',
    u: 'phongtm',
    name: 'Trần Minh Phong',
    team: 1,
    role: 'Cán bộ điện toán',
    duty: [
      'Lắp đặt, cài đặt, bảo trì máy tính, mạng nội bộ, đường truyền tại chi nhánh, PGD và điểm ATM.',
      'Hướng dẫn sử dụng phần mềm mới, đào tạo bảo mật và an toàn thông tin.',
      'Quản lý phân quyền user.',
    ],
    camp: [
      'Không tham gia chiến dịch 5 mũi nhọn; tập trung bảo đảm vận hành an toàn, liên tục cho các team giao dịch.',
    ],
    sup: 'Nguyễn Thị Ánh Nguyệt',
    bk: 'Nguyễn Hữu Thành',
    stt: 4,
    tasks: [
      {
        t: 'Xử lý giao dịch thẻ ATM, thừa thiếu quỹ ATM, khiếu nại thẻ ATM tại quầy, CDs…, xử lý lỗi giao dịch thẻ ATM trên ITC',
        r: 'Chính',
      },
      {
        t: 'CNTT phụ trách: Ban Giám đốc (ưu tiên 1), Phòng HTTD, KHDN Lớn, DVKH, PGD Thái Sơn',
        r: 'Chính',
      },
      {
        t: 'Xác minh giao dịch nghi ngờ, khiếu nại, thẻ bị nuốt tại máy: ATM trụ sở chi nhánh, PGD Thái Sơn, VNPT, PGD Nguyễn Văn Lượng',
        r: 'Chính',
      },
    ],
  },
  {
    id: 'thanh',
    u: 'thanhnh4',
    name: 'Nguyễn Hữu Thành',
    team: 1,
    role: 'Cán bộ điện toán',
    duty: [
      'Lắp đặt, cài đặt, bảo trì máy tính, mạng nội bộ, đường truyền tại chi nhánh, PGD và điểm ATM.',
      'Hướng dẫn sử dụng phần mềm mới, đào tạo bảo mật và an toàn thông tin.',
      'Quản lý phân quyền user.',
    ],
    camp: [
      'Không tham gia chiến dịch 5 mũi nhọn; tập trung bảo đảm vận hành an toàn, liên tục cho các team giao dịch.',
    ],
    sup: 'Nguyễn Thị Ánh Nguyệt',
    bk: 'Trần Minh Phong',
    stt: 5,
    tasks: [
      {
        t: 'Xử lý giao dịch thẻ ATM, thừa thiếu quỹ ATM, khiếu nại thẻ ATM tại quầy, CDs…, xử lý lỗi giao dịch thẻ ATM trên ITC',
        r: 'Chính',
      },
      {
        t: 'CNTT phụ trách: Ban Giám đốc (ưu tiên 2), Phòng TCTH, KHDN Vừa & Nhỏ, Bán lẻ, PGD Nguyễn Văn Lượng, PGD Phú Nhuận',
        r: 'Chính',
      },
      {
        t: 'Xác minh giao dịch nghi ngờ, khiếu nại, thẻ bị nuốt tại máy: ATM PGD Phú Nhuận, Công ty Giày Gia Định, ĐH Kinh tế Tài chính, SCSC',
        r: 'Chính',
      },
    ],
  },
  {
    id: 'tran',
    u: 'tranhb',
    name: 'Hồ Bảo Trân',
    team: 1,
    role: 'Kế toán nội bộ, kế toán tài chính',
    duty: [
      'Hạch toán kế toán tài chính và chi tiêu nội bộ.',
      'Lập bảng cân đối tài khoản, kê khai thuế GTGT hằng tháng.',
      'Theo dõi tài sản cố định, công cụ dụng cụ; lập báo cáo quản lý tài chính.',
    ],
    camp: [
      'Không tham gia chiến dịch 5 mũi nhọn; tập trung bảo đảm vận hành an toàn, liên tục cho các team giao dịch.',
    ],
    sup: 'Nguyễn Thị Ánh Nguyệt',
    bk: 'Nguyễn Thùy Duyên',
    stt: 6,
    tasks: [],
  },
  {
    id: 'duyen',
    u: 'duyennt3',
    name: 'Nguyễn Thùy Duyên',
    team: 1,
    role: 'Kế toán nội bộ, kế toán tài chính',
    duty: [
      'Hạch toán kế toán tài chính và chi tiêu nội bộ.',
      'Lập bảng cân đối tài khoản, kê khai thuế GTGT hằng tháng.',
      'Theo dõi tài sản cố định, công cụ dụng cụ; lập báo cáo quản lý tài chính.',
    ],
    camp: [
      'Không tham gia chiến dịch 5 mũi nhọn; tập trung bảo đảm vận hành an toàn, liên tục cho các team giao dịch.',
    ],
    sup: 'Nguyễn Thị Ánh Nguyệt',
    bk: 'Hồ Bảo Trân',
    stt: 7,
    tasks: [],
  },
  {
    id: 'huyen',
    u: 'tranthi.huyen',
    name: 'Trần Thị Huyền',
    team: 2,
    role: 'Phó phòng, trưởng Team 2',
    lead: true,
    duty: [
      'Dịch vụ khách hàng: giải đáp thắc mắc, khiếu nại tại quầy; quản lý thời gian chờ và điều phối sảnh; đầu mối khiếu nại từ TTDVKH.',
      'Thẻ và ATM: thừa thiếu quỹ ATM, khiếu nại thẻ, thẻ tồn, giao nhận thẻ, xử lý lỗi trên ITC.',
      'Thanh toán: điện chuyển tiền đến, điện tra soát, điện tồn, danh sách Pending từ TTTT, tra soát Napas.',
      'Khuyến mãi và chi dự thưởng; công tác ISO; cơ sở vật chất, vệ sinh, 5S.',
      'Chỉ tiêu: nguồn vốn trường học, bệnh viện; bảo hiểm VBI, Manulife; bán chéo tiền vay, TTTM, BL, thẻ TDQT; KHCN Mainbank.',
    ],
    camp: [
      'Giám sát chỉ tiêu 5 mũi nhọn của Team 2.',
      'Phụ trách chỉ tiêu hai mũi nhọn bảo hiểm VBI và Manulife; kèm cặp đầu mối Phương Hoa và Thùy Linh.',
      'Ngày 1–5: phân giao danh sách khách cho giao dịch viên Team 2.',
      'Ngày 27–30: đối soát kết quả Team 2 và hai mũi nhọn bảo hiểm với nguồn chính thức.',
    ],
    sup: 'Nguyễn Thị Ánh Nguyệt',
    bk: 'Đoàn Thị Bích Vân',
    stt: 8,
    tasks: [
      { t: 'Rà soát hồ sơ PGD Thái Sơn chuyển lên Scanimg', r: 'Chính' },
      { t: 'Xử lý đơn thư, phúc đáp công văn Thuế, Công an: rà soát, ký và trình BGĐ', r: 'Thứ tự 2' },
      { t: 'Theo dõi danh sách điện Pending từ TTTT', r: 'Thứ tự 2' },
      { t: 'Xử lý điện đến sai tên, in lưu chứng từ theo QT 36.04', r: 'Thứ tự 1' },
      { t: 'Tiếp nhận và phân công trả lời CC', r: 'Ưu tiên 1' },
    ],
  },
  {
    id: 'nguyetanh',
    u: 'anhntn18',
    name: 'Ngô Thị Nguyệt Ánh',
    team: 2,
    role: 'Giao dịch viên',
    duty: [
      'Thực hiện giao dịch tiền gửi, thanh toán, ngoại tệ và dịch vụ tài khoản tại quầy.',
      'Thực hiện toàn bộ giao dịch cho KHDN theo danh sách phân công và cho KHCN, KHDN của RM được ghép cặp.',
      'Luân phiên trực cuối ngày, mở tài khoản theo lô; tự theo dõi, duy trì lãi suất tiền gửi đến hạn của khách mình quản lý.',
      'Phối hợp với các RM được ghép cặp để phục vụ khách của RM tại quầy.',
      'Tư vấn, bán chéo theo danh sách khách được giao; cập nhật KPI hoạt động cuối ngày.',
    ],
    camp: [
      'Bán theo danh sách khách 5 mũi nhọn được phó phòng phân giao.',
      'Cập nhật KPI hoạt động hằng ngày để đầu mối và phó phòng theo dõi.',
    ],
    sup: 'Trần Thị Huyền',
    bk: 'Thành viên Team 2 theo ca',
    stt: 9,
    tasks: [
      { t: 'Hạch toán các bút toán của kế toán nội bộ', r: 'Chính' },
      { t: 'Điện TT của các PGD qua Scanimg và IB', r: 'Chính' },
      {
        t: 'Xử lý giao dịch thẻ ATM, thừa thiếu quỹ ATM, khiếu nại thẻ ATM tại quầy, CDs…, xử lý lỗi giao dịch thẻ ATM trên ITC',
        r: 'Chính',
      },
      { t: 'Xử lý điện chuyển tiền đến, điện KBNN, điện tra soát, theo dõi xử lý điện tồn', r: 'Dự phòng 2' },
      { t: 'Báo có ĐVCNT, Hoàn trả, nhờ thu; Chấm GL xử lý hoàn trả, charge back', r: 'Dự phòng 1' },
      { t: 'Báo cáo ngoại tệ với NHNN', r: 'Dự phòng 3' },
      { t: 'Đối chiếu VNPT, thu phí, xuất hóa đơn', r: 'Dự phòng 3' },
      { t: 'Trung tâm Đăng kiểm xe cơ giới', r: 'Dự phòng 1' },
      { t: 'Bảo hiểm xã hội Quận Phú Nhuận (đầu mối làm việc, sao kê hàng tháng, báo cáo…)', r: 'Chính' },
      { t: 'Tiền kiểm, hậu kiểm Ekyc admin hàng ngày', r: 'Dự phòng 2' },
      { t: 'Lệnh chi trên Bank admin', r: 'Dự phòng 2' },
      { t: 'Báo có Điện chuyển tiền ngoại tệ đến', r: 'Chính' },
      { t: 'Theo dõi xử lý tra soát ngoại tệ', r: 'Chính' },
      { t: 'Kế toán quỹ', r: 'Dự phòng 2' },
      { t: 'Điện thanh toán KHDN PGD Thái Sơn (Scanimg, IB)', r: 'Chính' },
    ],
    rm: [
      ['Đoàn Thị Bảo Trâm', 'RM', 'Phòng Bán lẻ'],
      ['Bùi Nguyễn Yến Nhi', 'RM', 'Phòng KHDN Lớn'],
      ['Vũ Nguyễn Ngọc Uyên', 'RM', 'Phòng KHDN Lớn'],
      ['Hà Nguyệt Tú', 'RM', 'Phòng KHDN Vừa & Nhỏ'],
    ],
  },
  {
    id: 'bao',
    u: 'baodq',
    name: 'Đặng Quốc Bảo',
    team: 2,
    role: 'Giao dịch viên',
    duty: [
      'Thực hiện giao dịch tiền gửi, thanh toán, ngoại tệ và dịch vụ tài khoản tại quầy.',
      'Thực hiện toàn bộ giao dịch cho KHDN theo danh sách phân công và cho KHCN, KHDN của RM được ghép cặp.',
      'Luân phiên trực cuối ngày, mở tài khoản theo lô; tự theo dõi, duy trì lãi suất tiền gửi đến hạn của khách mình quản lý.',
      'Phối hợp với các RM được ghép cặp để phục vụ khách của RM tại quầy.',
      'Tư vấn, bán chéo theo danh sách khách được giao; cập nhật KPI hoạt động cuối ngày.',
    ],
    camp: [
      'Bán theo danh sách khách 5 mũi nhọn được phó phòng phân giao.',
      'Cập nhật KPI hoạt động hằng ngày để đầu mối và phó phòng theo dõi.',
    ],
    sup: 'Trần Thị Huyền',
    bk: 'Thành viên Team 2 theo ca',
    stt: 10,
    tasks: [
      { t: 'Hạch toán các bút toán của kế toán nội bộ', r: 'Chính' },
      { t: 'Điện TT của các PGD qua Scanimg và IB', r: 'Chính' },
      {
        t: 'Xử lý giao dịch thẻ ATM, thừa thiếu quỹ ATM, khiếu nại thẻ ATM tại quầy, CDs…, xử lý lỗi giao dịch thẻ ATM trên ITC',
        r: 'Dự phòng 2',
      },
      { t: 'Xử lý điện chuyển tiền đến, điện KBNN, điện tra soát, theo dõi xử lý điện tồn', r: 'Chính' },
      { t: 'Báo có ĐVCNT, Hoàn trả, nhờ thu; Chấm GL xử lý hoàn trả, charge back', r: 'Chính' },
      { t: 'Hóa đơn điện tử, hóa đơn ĐVCNT', r: 'Chính' },
      { t: 'Đối chiếu VNPT, thu phí, xuất hóa đơn', r: 'Chính' },
      { t: 'Theo dõi các khoản thu nợ thẻ tín dụng bị lỗi để xử lý cho khách hàng', r: 'Chính' },
      { t: 'Tiền kiểm, hậu kiểm Ekyc admin hàng ngày', r: 'Chính' },
      { t: 'Báo có Điện chuyển tiền ngoại tệ đến', r: 'Dự phòng 2' },
      { t: 'Theo dõi xử lý tra soát ngoại tệ', r: 'Dự phòng 2' },
      { t: 'Kế toán quỹ', r: 'Chính' },
      { t: 'Điện thanh toán KHCN PGD Thái Sơn (Scanimg, IB)', r: 'Chính' },
      { t: 'Giải ngân chuyển tiền trong nước cho KHDN', r: 'Chính' },
    ],
    rm: [
      ['Mai Cảnh Toàn', 'SSO', 'Phòng Bán lẻ'],
      ['Phạm Trường An', 'TTTM', 'Phòng KHDN Lớn'],
      ['Lê Thanh Tuyền', 'RM', 'Phòng KHDN Vừa & Nhỏ'],
      ['Phan Thanh Phú', 'RM', 'Phòng KHDN Vừa & Nhỏ'],
    ],
  },
  {
    id: 'khang',
    u: 'khangtn',
    name: 'Tô Ngọc Khang',
    team: 2,
    role: 'Kiểm soát viên',
    duty: [
      'Kiểm tra, phê duyệt và chịu trách nhiệm cuối cùng về tính chính xác của giao dịch tại quầy theo thẩm quyền.',
      'Giám sát thu chi tiền mặt của giao dịch viên tại trụ sở.',
      'Kiểm soát, phê duyệt hồ sơ tài khoản scan, upload lên CPM; đôn đốc hồ sơ chưa scan; lập kế hoạch chuyển hồ sơ về kho lưu trữ.',
      'Xử lý đơn thư, phúc đáp công văn của Thuế, Công an, cơ quan thẩm quyền.',
      'Tham gia điều phối sảnh, quản lý thời gian chờ.',
    ],
    camp: [
      'Kiểm soát, phê duyệt giao dịch và hồ sơ tài khoản phát sinh từ chiến dịch theo thẩm quyền, bảo đảm tuân thủ.',
    ],
    sup: 'Trần Thị Huyền',
    bk: 'Lãnh đạo phòng theo phân công',
    stt: 11,
    tasks: [
      { t: 'Xử lý đơn thư, phúc đáp công văn Thuế, Công an: soạn thảo', r: 'Thứ tự 1' },
      { t: 'Theo dõi danh sách điện Pending từ TTTT', r: 'Thứ tự 1' },
      { t: 'Xử lý điện đến sai tên, in lưu chứng từ theo QT 36.04', r: 'Thứ tự 2' },
      { t: 'Tiếp nhận và phân công trả lời CC', r: 'Ưu tiên 2' },
    ],
  },
  {
    id: 'phuonghoa',
    u: 'hoantp2',
    name: 'Nguyễn Thị Phương Hoa',
    team: 2,
    role: 'Giao dịch viên',
    duty: [
      'Thực hiện giao dịch tiền gửi, thanh toán, ngoại tệ và dịch vụ tài khoản tại quầy.',
      'Thực hiện toàn bộ giao dịch cho KHDN theo danh sách phân công và cho KHCN, KHDN của RM được ghép cặp.',
      'Luân phiên trực cuối ngày, mở tài khoản theo lô; tự theo dõi, duy trì lãi suất tiền gửi đến hạn của khách mình quản lý.',
      'Phối hợp với các RM được ghép cặp để phục vụ khách của RM tại quầy.',
      'Tư vấn, bán chéo theo danh sách khách được giao; cập nhật KPI hoạt động cuối ngày.',
    ],
    camp: [
      'Đầu mối mũi nhọn VBI: tư vấn, báo phí, phát hành và tái tục.',
      'Phối hợp chuyên viên VBI cho Health Day, Auto Care, Business Protect, Renewal; theo dõi hợp đồng sắp hết hạn trong 60 ngày.',
      'Ngày 1–5: lập danh sách khách mục tiêu VBI từ dữ liệu được chiết xuất.',
      'Ngày 27–30: tổng hợp kết quả VBI gửi Phó phòng Huyền đối soát.',
    ],
    sup: 'Trần Thị Huyền',
    bk: 'Thành viên Team 2 theo ca',
    tag: 'Đầu mối VBI',
    stt: 12,
    tasks: [
      { t: 'Hạch toán các bút toán của kế toán nội bộ', r: 'Chính' },
      { t: 'Điện TT của các PGD qua Scanimg và IB', r: 'Chính' },
      { t: 'Xử lý điện chuyển tiền đến, điện KBNN, điện tra soát, theo dõi xử lý điện tồn', r: 'Dự phòng 1' },
      { t: 'Đối chiếu VNPT, thu phí, xuất hóa đơn', r: 'Dự phòng 2' },
      { t: 'Trung tâm Đăng kiểm xe cơ giới', r: 'Chính' },
      { t: 'Theo dõi các khoản thu nợ thẻ tín dụng bị lỗi để xử lý cho khách hàng', r: 'Dự phòng 1' },
      { t: 'Tiền kiểm, hậu kiểm Ekyc admin hàng ngày', r: 'Dự phòng 1' },
      { t: 'Lệnh chi trên Bank admin', r: 'Chính' },
      { t: 'Báo có Điện chuyển tiền ngoại tệ đến', r: 'Dự phòng 1' },
      { t: 'Theo dõi xử lý tra soát ngoại tệ', r: 'Dự phòng 1' },
      { t: 'Kế toán quỹ', r: 'Dự phòng 1' },
      { t: 'Điện thanh toán PGD Nguyễn Văn Lượng (Scanimg, IB)', r: 'Chính' },
      { t: 'Điện ngoại tệ KHCN phát sinh trên Bank Admin, IB (do Hải Yến chuyển)', r: 'Chính' },
    ],
    rm: [
      ['Thái Kim Anh', 'SSO', 'Phòng Bán lẻ'],
      ['Trần Thị Tường Vy', 'TTTM', 'Phòng KHDN Lớn'],
      ['Võ Minh Như', 'FDI', 'Phòng KHDN Lớn'],
      ['Vũ Yến Nhi', 'RM', 'Phòng KHDN Vừa & Nhỏ'],
    ],
  },
  {
    id: 'kimlam',
    u: 'lamttk',
    name: 'Trương Thị Kim Lâm',
    team: 2,
    role: 'Giao dịch viên',
    duty: [
      'Thực hiện giao dịch tiền gửi, thanh toán, ngoại tệ và dịch vụ tài khoản tại quầy.',
      'Thực hiện toàn bộ giao dịch cho KHDN theo danh sách phân công và cho KHCN, KHDN của RM được ghép cặp.',
      'Luân phiên trực cuối ngày, mở tài khoản theo lô; tự theo dõi, duy trì lãi suất tiền gửi đến hạn của khách mình quản lý.',
      'Phối hợp với các RM được ghép cặp để phục vụ khách của RM tại quầy.',
      'Tư vấn, bán chéo theo danh sách khách được giao; cập nhật KPI hoạt động cuối ngày.',
    ],
    camp: [
      'Bán theo danh sách khách 5 mũi nhọn được phó phòng phân giao.',
      'Cập nhật KPI hoạt động hằng ngày để đầu mối và phó phòng theo dõi.',
    ],
    sup: 'Trần Thị Huyền',
    bk: 'Thành viên Team 2 theo ca',
    stt: 13,
    tasks: [
      { t: 'Hạch toán các bút toán của kế toán nội bộ', r: 'Chính' },
      { t: 'Điện TT của các PGD qua Scanimg và IB', r: 'Chính' },
      {
        t: 'Xử lý giao dịch thẻ ATM, thừa thiếu quỹ ATM, khiếu nại thẻ ATM tại quầy, CDs…, xử lý lỗi giao dịch thẻ ATM trên ITC',
        r: 'Dự phòng 1',
      },
      { t: 'Xử lý điện chuyển tiền đến, điện KBNN, điện tra soát, theo dõi xử lý điện tồn', r: 'Dự phòng 3' },
      { t: 'Báo có ĐVCNT, Hoàn trả, nhờ thu; Chấm GL xử lý hoàn trả, charge back', r: 'Dự phòng 2' },
      { t: 'Hóa đơn điện tử, hóa đơn ĐVCNT', r: 'Dự phòng 1' },
      { t: 'Báo cáo ngoại tệ với NHNN', r: 'Chính' },
      { t: 'Chuyển tiền VNPT hàng ngày', r: 'Dự phòng 2' },
      { t: 'Quầy khách hàng ưu tiên', r: 'Dự phòng 2' },
      { t: 'Trung tâm Đăng kiểm xe cơ giới', r: 'Dự phòng 3' },
      { t: 'Bảo hiểm xã hội Quận Phú Nhuận (đầu mối làm việc, sao kê hàng tháng, báo cáo…)', r: 'Dự phòng 1' },
      { t: 'Xử lý lương trên Bank admin', r: 'Dự phòng 1' },
      { t: 'Lệnh chi trên Bank admin', r: 'Dự phòng 1' },
      { t: 'Xử lý Alias chờ phê duyệt hàng ngày trên TPSS', r: 'Dự phòng 3' },
      { t: 'Báo có Điện chuyển tiền ngoại tệ đến', r: 'Dự phòng 2' },
      { t: 'Theo dõi xử lý tra soát ngoại tệ', r: 'Dự phòng 2' },
      { t: 'Kiểm soát VFX cuối ngày', r: 'Dự phòng 3' },
      { t: 'Theo dõi xử lý điện ngoại tệ trên Bank Admin, IB', r: 'Dự phòng 1' },
      { t: 'Quản lý, theo dõi, xử lý thẻ nuốt theo quy trình', r: 'Dự phòng 1' },
      { t: 'Điện thanh toán KHDN PGD Phú Nhuận (Scanimg, IB)', r: 'Chính' },
    ],
    rm: [
      ['Nguyễn Đăng Khoa', 'RM', 'Phòng Bán lẻ'],
      ['Bùi Thị Mai Phương', 'RM', 'Phòng KHDN Lớn'],
      ['Đỗ Huy Cẩn', 'RM', 'Phòng KHDN Vừa & Nhỏ'],
      ['Nguyễn Hà Linh', 'RM', 'Phòng KHDN Vừa & Nhỏ'],
    ],
  },
  {
    id: 'van',
    u: 'dtbvan',
    name: 'Đoàn Thị Bích Vân',
    team: 3,
    role: 'Phó phòng, trưởng Team 3',
    lead: true,
    duty: [
      'Chuyển tiền ngoại tệ: điều phối rà soát chứng từ mọi kênh, kiểm tra điện tối thiểu 30 phút/lần, bảo đảm SLA; bồi hoàn chứng từ.',
      'Rà soát, khắc phục lỗi dữ liệu DQS theo từng đợt.',
      'Cập nhật lưu lượng giao dịch, năng suất lao động để bố trí công việc; điều phối việc phát sinh; phân công công văn Edoc.',
      'Sổ theo dõi lỗi tác nghiệp, tổng hợp hằng tuần, lập biên bản chấn chỉnh.',
      'Phòng chống rửa tiền, quản lý rủi ro hoạt động; dịch vụ khách hàng và điều phối sảnh.',
      'Chỉ tiêu: thu thuần ngoài lãi (phí dịch vụ, kinh doanh ngoại tệ); KHDN Mainbank; MAU eFAST.',
    ],
    camp: [
      'Giám sát chỉ tiêu 5 mũi nhọn của Team 3.',
      'Phụ trách chỉ tiêu ba mũi nhọn ngoại hối, tài khoản số đẹp, gói tài khoản V-Plus và V-Advance.',
      'Kèm cặp, đánh giá hai cán bộ quy hoạch Ly Na và Thùy Linh.',
      'Ngày 1–5: phân giao danh sách khách cho giao dịch viên Team 3.',
      'Ngày 27–30: đối soát kết quả Team 3 và ba mũi nhọn thu phí với nguồn chính thức.',
    ],
    sup: 'Nguyễn Thị Ánh Nguyệt',
    bk: 'Nguyễn Thị Ánh Nguyệt',
    stt: 14,
    tasks: [
      { t: 'Rà soát hồ sơ PGD Phú Nhuận, PGD Nguyễn Văn Lượng chuyển lên Scanimg', r: 'Chính' },
      { t: 'Xử lý đơn thư, phúc đáp công văn Thuế, Công an', r: 'Thứ tự 3' },
      { t: 'Theo dõi danh sách điện Pending từ TTTT', r: 'Thứ tự 3' },
      { t: 'Xử lý điện đến sai tên, in lưu chứng từ theo QT 36.04', r: 'Thứ tự 3' },
      { t: 'Tiếp nhận và phân công trả lời CC', r: 'Ưu tiên 3' },
    ],
  },
  {
    id: 'haiyen',
    u: 'yennth17',
    name: 'Nguyễn Thị Hải Yến',
    team: 3,
    role: 'Giao dịch viên',
    duty: [
      'Thực hiện giao dịch tiền gửi, thanh toán, ngoại tệ và dịch vụ tài khoản tại quầy.',
      'Thực hiện toàn bộ giao dịch cho KHDN theo danh sách phân công và cho KHCN, KHDN của RM được ghép cặp.',
      'Luân phiên trực cuối ngày, mở tài khoản theo lô; tự theo dõi, duy trì lãi suất tiền gửi đến hạn của khách mình quản lý.',
      'Phối hợp với các RM được ghép cặp để phục vụ khách của RM tại quầy.',
      'Tư vấn, bán chéo theo danh sách khách được giao; cập nhật KPI hoạt động cuối ngày.',
    ],
    camp: [
      'Bán theo danh sách khách 5 mũi nhọn được phó phòng phân giao.',
      'Cập nhật KPI hoạt động hằng ngày để đầu mối và phó phòng theo dõi.',
    ],
    sup: 'Đoàn Thị Bích Vân',
    bk: 'Thành viên Team 3 theo ca',
    stt: 15,
    tasks: [
      { t: 'Hạch toán các bút toán của kế toán nội bộ', r: 'Chính' },
      { t: 'Điện TT của các PGD qua Scanimg và IB', r: 'Chính' },
      {
        t: 'Xử lý giao dịch thẻ ATM, thừa thiếu quỹ ATM, khiếu nại thẻ ATM tại quầy, CDs…, xử lý lỗi giao dịch thẻ ATM trên ITC',
        r: 'Dự phòng 3',
      },
      { t: 'Báo có ĐVCNT, Hoàn trả, nhờ thu; Chấm GL xử lý hoàn trả, charge back', r: 'Dự phòng 3' },
      { t: 'Hóa đơn điện tử, hóa đơn ĐVCNT', r: 'Dự phòng 2' },
      { t: 'Báo cáo ngoại tệ với NHNN', r: 'Dự phòng 2' },
      { t: 'Chuyển tiền VNPT hàng ngày', r: 'Dự phòng 3' },
      { t: 'Quầy khách hàng ưu tiên', r: 'Dự phòng 3' },
      { t: 'Trung tâm Đăng kiểm xe cơ giới', r: 'Dự phòng 2' },
      { t: 'Theo dõi các khoản thu nợ thẻ tín dụng bị lỗi để xử lý cho khách hàng', r: 'Dự phòng 2' },
      { t: 'Tiền kiểm, hậu kiểm Ekyc admin hàng ngày', r: 'Dự phòng 3' },
      { t: 'Xử lý lương trên Bank admin', r: 'Chính' },
      { t: 'Xử lý Alias chờ phê duyệt hàng ngày trên TPSS', r: 'Chính' },
      { t: 'Báo có Điện chuyển tiền ngoại tệ đến', r: 'Dự phòng 1' },
      { t: 'Theo dõi xử lý tra soát ngoại tệ', r: 'Dự phòng 1' },
      { t: 'Kiểm soát VFX cuối ngày', r: 'Chính' },
      { t: 'Theo dõi xử lý điện ngoại tệ trên Bank Admin, IB', r: 'Chính' },
      { t: 'Kế toán quỹ', r: 'Dự phòng 3' },
      { t: 'Quản lý, theo dõi, xử lý thẻ nuốt theo quy trình', r: 'Dự phòng 2' },
      { t: 'Điện thanh toán KHDN PGD Thái Sơn (Scanimg, IB)', r: 'Chính' },
    ],
    rm: [
      ['Phạm Thanh Khuê', 'RM', 'Phòng Bán lẻ'],
      ['Nguyễn Thị Kiều', 'RM', 'Phòng KHDN Lớn'],
      ['Mai Quang Đạt', 'RM', 'Phòng KHDN Vừa & Nhỏ'],
    ],
  },
  {
    id: 'thuhoa',
    u: 'hoaltt',
    name: 'Lê Thị Thu Hoa',
    team: 3,
    role: 'Giao dịch viên',
    duty: [
      'Thực hiện giao dịch tiền gửi, thanh toán, ngoại tệ và dịch vụ tài khoản tại quầy.',
      'Thực hiện toàn bộ giao dịch cho KHDN theo danh sách phân công và cho KHCN, KHDN của RM được ghép cặp.',
      'Luân phiên trực cuối ngày, mở tài khoản theo lô; tự theo dõi, duy trì lãi suất tiền gửi đến hạn của khách mình quản lý.',
      'Phối hợp với các RM được ghép cặp để phục vụ khách của RM tại quầy.',
      'Tư vấn, bán chéo theo danh sách khách được giao; cập nhật KPI hoạt động cuối ngày.',
    ],
    camp: [
      'Bán theo danh sách khách 5 mũi nhọn được phó phòng phân giao.',
      'Cập nhật KPI hoạt động hằng ngày để đầu mối và phó phòng theo dõi.',
    ],
    sup: 'Đoàn Thị Bích Vân',
    bk: 'Thành viên Team 3 theo ca',
    stt: 16,
    tasks: [
      { t: 'Điện TT của các PGD qua Scanimg và IB', r: 'Chính' },
      { t: 'Chuyển tiền VNPT hàng ngày', r: 'Chính' },
      { t: 'Đối chiếu VNPT, thu phí, xuất hóa đơn', r: 'Dự phòng 1' },
      { t: 'Quầy khách hàng ưu tiên', r: 'Chính' },
      { t: 'Bảo hiểm xã hội Quận Phú Nhuận (đầu mối làm việc, sao kê hàng tháng, báo cáo…)', r: 'Dự phòng 2' },
      { t: 'Xử lý lương trên Bank admin', r: 'Dự phòng 3' },
      { t: 'Xử lý Alias chờ phê duyệt hàng ngày trên TPSS', r: 'Dự phòng 1' },
      { t: 'Kiểm soát VFX cuối ngày', r: 'Dự phòng 1' },
      { t: 'Theo dõi xử lý điện ngoại tệ trên Bank Admin, IB', r: 'Dự phòng 3' },
      { t: 'Quản lý, theo dõi, xử lý thẻ nuốt theo quy trình', r: 'Chính' },
      { t: 'Phòng chống rửa tiền', r: 'Chính' },
      { t: 'Điện thanh toán KHCN PGD Phú Nhuận (Scanimg, IB)', r: 'Chính' },
      { t: 'Phòng chống rửa tiền: cấp user SRT', r: 'Chính' },
    ],
    rm: [
      ['Trần Minh Ngọc Diễm', 'SSO', 'Phòng Bán lẻ'],
      ['Lê Thị Phương Hà', 'RM', 'Phòng KHDN Lớn'],
      ['Phan Thị Tố Uyên', 'RM', 'Phòng KHDN Lớn'],
      ['Khưu Mộc Khôi', 'RM', 'Phòng KHDN Vừa & Nhỏ'],
    ],
  },
  {
    id: 'lyna',
    u: 'nattl',
    name: 'Trần Thị Ly Na',
    team: 3,
    role: 'Giao dịch viên',
    duty: [
      'Thực hiện giao dịch tiền gửi, thanh toán, ngoại tệ và dịch vụ tài khoản tại quầy.',
      'Thực hiện toàn bộ giao dịch cho KHDN theo danh sách phân công và cho KHCN, KHDN của RM được ghép cặp.',
      'Luân phiên trực cuối ngày, mở tài khoản theo lô; tự theo dõi, duy trì lãi suất tiền gửi đến hạn của khách mình quản lý.',
      'Phối hợp với các RM được ghép cặp để phục vụ khách của RM tại quầy.',
      'Tư vấn, bán chéo theo danh sách khách được giao; cập nhật KPI hoạt động cuối ngày.',
    ],
    quyhoach: true,
    camp: [
      'Đầu mối 3 mũi nhọn: ngoại hối, tài khoản số đẹp, gói tài khoản V-Plus và V-Advance.',
      'Theo dõi giao dịch ngoại tệ, kích hoạt eFAST, phí số đẹp và phí gói thực thu.',
      'Ngày 1–5: lập danh sách khách mục tiêu cho 3 mũi nhọn từ dữ liệu được chiết xuất.',
      'Ngày 27–30: tổng hợp kết quả 3 mũi nhọn gửi Phó phòng Bích Vân đối soát; trình bày trong họp tổng kết.',
    ],
    sup: 'Đoàn Thị Bích Vân',
    bk: 'Thành viên Team 3 theo ca',
    tag: 'Đầu mối ngoại hối, số đẹp, gói TK',
    stt: 17,
    tasks: [],
    rm: [
      ['Bùi Thị Phương Diễm', 'RM', 'Phòng Bán lẻ'],
      ['Nguyễn Đỗ Vân Anh', 'RM', 'Phòng Bán lẻ'],
      ['Khưu Hiếu Thảo', 'FDI', 'Phòng KHDN Lớn'],
      ['Nguyễn Thị Thùy Linh', 'RM', 'Phòng KHDN Vừa & Nhỏ'],
    ],
  },
  {
    id: 'thuylinh',
    u: 'linhptt3',
    name: 'Phạm Thị Thùy Linh',
    team: 3,
    role: 'Giao dịch viên',
    duty: [
      'Thực hiện giao dịch tiền gửi, thanh toán, ngoại tệ và dịch vụ tài khoản tại quầy.',
      'Thực hiện toàn bộ giao dịch cho KHDN theo danh sách phân công và cho KHCN, KHDN của RM được ghép cặp.',
      'Luân phiên trực cuối ngày, mở tài khoản theo lô; tự theo dõi, duy trì lãi suất tiền gửi đến hạn của khách mình quản lý.',
      'Phối hợp với các RM được ghép cặp để phục vụ khách của RM tại quầy.',
      'Tư vấn, bán chéo theo danh sách khách được giao; cập nhật KPI hoạt động cuối ngày.',
    ],
    quyhoach: true,
    camp: [
      'Đầu mối mũi nhọn Manulife: kết nối chuyên viên Manulife, tổ chức tư vấn, theo dõi hồ sơ đến hợp đồng phát hành.',
      'Nhân rộng cách làm của các cán bộ đã phát sinh doanh số.',
      'Ngày 1–5: lập danh sách khách mục tiêu Manulife từ dữ liệu được chiết xuất.',
      'Ngày 27–30: tổng hợp kết quả Manulife gửi Phó phòng Huyền đối soát; trình bày trong họp tổng kết.',
    ],
    sup: 'Đoàn Thị Bích Vân (team); Trần Thị Huyền (chỉ tiêu bảo hiểm)',
    bk: 'Thành viên Team 3 theo ca',
    tag: 'Đầu mối Manulife',
    stt: 18,
    tasks: [
      { t: 'Điện TT của các PGD qua Scanimg và IB', r: 'Chính' },
      { t: 'Báo cáo ngoại tệ với NHNN', r: 'Dự phòng 1' },
      { t: 'Chuyển tiền VNPT hàng ngày', r: 'Dự phòng 1' },
      { t: 'Quầy khách hàng ưu tiên', r: 'Dự phòng 1' },
      { t: 'Theo dõi các khoản thu nợ thẻ tín dụng bị lỗi để xử lý cho khách hàng', r: 'Dự phòng 3' },
      { t: 'Bảo hiểm xã hội Quận Phú Nhuận (đầu mối làm việc, sao kê hàng tháng, báo cáo…)', r: 'Dự phòng 3' },
      { t: 'Xử lý lương trên Bank admin', r: 'Dự phòng 2' },
      { t: 'Lệnh chi trên Bank admin', r: 'Dự phòng 3' },
      { t: 'Xử lý Alias chờ phê duyệt hàng ngày trên TPSS', r: 'Dự phòng 2' },
      { t: 'Báo có Điện chuyển tiền ngoại tệ đến', r: 'Chính' },
      { t: 'Theo dõi xử lý tra soát ngoại tệ', r: 'Chính' },
      { t: 'Kiểm soát VFX cuối ngày', r: 'Dự phòng 2' },
      { t: 'Theo dõi xử lý điện ngoại tệ trên Bank Admin, IB', r: 'Dự phòng 2' },
      { t: 'Quản lý, theo dõi, xử lý thẻ nuốt theo quy trình', r: 'Dự phòng 3' },
      { t: 'Điện thanh toán KHDN PGD Phú Nhuận (Scanimg, IB)', r: 'Chính' },
    ],
    rm: [
      ['Lê Thị Hoanh', 'RM', 'Phòng Bán lẻ'],
      ['Nguyễn Xuân Thắng', 'RM', 'Phòng KHDN Lớn'],
      ['Từ Nguyễn Thanh Nhàn', 'FDI', 'Phòng KHDN Lớn'],
      ['Lư Lâm Phước', 'RM', 'Phòng KHDN Vừa & Nhỏ'],
    ],
  },
];

export const CAMPAIGN_MATRIX: CampaignSpearhead[] = [
  {
    team: 3,
    product: 'Ngoại hối',
    ownerId: 'lyna',
    leadId: 'van',
    notes: 'Theo dõi giao dịch ngoại tệ, kích hoạt eFAST và doanh số mua bán ngoại tệ.',
  },
  {
    team: 3,
    product: 'Tài khoản số đẹp',
    ownerId: 'lyna',
    leadId: 'van',
    notes: 'Tư vấn tài khoản số đẹp cho KHCN, KHDN và theo dõi phí thực thu.',
  },
  {
    team: 3,
    product: 'Gói tài khoản V-Plus, V-Advance',
    ownerId: 'lyna',
    leadId: 'van',
    notes: 'Chuyển đổi gói tài khoản cho khách hàng hiện hữu và mở mới.',
  },
  {
    team: 3,
    product: 'Bảo hiểm nhân thọ Manulife',
    ownerId: 'thuylinh',
    leadId: 'huyen',
    notes: 'Kết nối chuyên viên Manulife, tổ chức tư vấn và theo dõi hợp đồng phát hành.',
  },
  {
    team: 2,
    product: 'Bảo hiểm phi nhân thọ VBI',
    ownerId: 'phuonghoa',
    leadId: 'huyen',
    notes: 'Phối hợp chuyên viên VBI cho Health Day, Auto Care, Business Protect, Renewal (60 ngày).',
  },
];

export const CAMPAIGN_STEPS = [
  {
    when: 'Ngày 1–5 · Giao việc',
    items: [
      { actor: 'Phó phụ trách phòng', detail: 'chiết xuất dữ liệu khách hàng, chốt chỉ tiêu theo team.' },
      { actor: 'Đầu mối mũi nhọn', detail: 'lập danh sách khách mục tiêu cho mũi nhọn của mình.' },
      { actor: 'Hai phó phòng', detail: 'phân giao danh sách cho giao dịch viên trong team.' },
      { actor: 'Phó phụ trách phòng', detail: 'phê duyệt danh sách, chỉ tiêu và người phụ trách.' },
    ],
  },
  {
    when: 'Ngày 27–30 · Đối soát',
    items: [
      { actor: 'Đầu mối mũi nhọn', detail: 'tổng hợp kết quả mũi nhọn của mình.' },
      {
        actor: 'Phó phòng phụ trách chỉ tiêu',
        detail: 'đối soát với nguồn chính thức: Huyền cho VBI, Manulife; Bích Vân cho ngoại hối, số đẹp, gói tài khoản.',
      },
      { actor: 'Hai phó phòng', detail: 'xác nhận kết quả theo team.' },
      { actor: 'Phó phụ trách phòng', detail: 'phê duyệt, chủ trì tổng kết và vinh danh.' },
    ],
  },
];

export const TASK_GRID: TaskGridRow[] = [
  {
    t: 'Hạch toán các bút toán của kế toán nội bộ',
    c: [
      ['anhntn18', 'baodq', 'hoantp2', 'lamttk', 'yennth17'],
      ['anhntn18', 'baodq', 'hoantp2', 'lamttk', 'yennth17'],
      [],
      [],
    ],
  },
  {
    t: 'Điện TT của các PGD qua Scanimg và IB',
    c: [['anhntn18', 'baodq', 'hoantp2', 'lamttk', 'yennth17', 'hoaltt', 'linhptt3'], [], [], []],
  },
  {
    t: 'Xử lý giao dịch thẻ ATM, thừa thiếu quỹ ATM, khiếu nại thẻ ATM tại quầy, CDs…, xử lý lỗi giao dịch thẻ ATM trên ITC',
    c: [['phongtm', 'thanhnh4', 'anhntn18'], ['lamttk'], ['baodq'], ['yennth17']],
  },
  {
    t: 'Xử lý điện chuyển tiền đến, điện KBNN, điện tra soát, theo dõi xử lý điện tồn',
    c: [['baodq'], ['hoantp2'], ['anhntn18'], ['lamttk']],
  },
  {
    t: 'Báo có ĐVCNT, Hoàn trả, nhờ thu; Chấm GL xử lý hoàn trả, charge back',
    c: [['baodq'], ['anhntn18'], ['lamttk'], ['yennth17']],
  },
  {
    t: 'Hóa đơn điện tử, hóa đơn ĐVCNT',
    c: [['baodq'], ['lamttk'], ['yennth17'], ['lamttk']],
  },
  {
    t: 'Báo cáo ngoại tệ với NHNN',
    c: [['lamttk'], ['linhptt3'], ['yennth17'], ['anhntn18']],
  },
  {
    t: 'Chuyển tiền VNPT hàng ngày',
    c: [['hoaltt'], ['linhptt3'], ['lamttk'], ['yennth17']],
  },
  {
    t: 'Đối chiếu VNPT, thu phí, xuất hóa đơn',
    c: [['baodq'], ['hoaltt'], ['hoantp2'], ['anhntn18']],
  },
  {
    t: 'Quầy khách hàng ưu tiên',
    c: [['hoaltt'], ['linhptt3'], ['lamttk'], ['yennth17']],
  },
  {
    t: 'Trung tâm Đăng kiểm xe cơ giới',
    c: [['hoantp2'], ['anhntn18'], ['yennth17'], ['lamttk']],
  },
  {
    t: 'Theo dõi các khoản thu nợ thẻ tín dụng bị lỗi để xử lý cho khách hàng',
    c: [['baodq'], ['hoantp2'], ['yennth17'], ['linhptt3']],
  },
  {
    t: 'Bảo hiểm xã hội Quận Phú Nhuận (đầu mối làm việc, sao kê hàng tháng, báo cáo…)',
    c: [['anhntn18'], ['lamttk'], ['hoaltt'], ['linhptt3']],
  },
  {
    t: 'Tiền kiểm, hậu kiểm Ekyc admin hàng ngày',
    c: [['baodq'], ['hoantp2'], ['anhntn18'], ['yennth17']],
  },
  {
    t: 'Xử lý lương trên Bank admin',
    c: [['yennth17'], ['lamttk'], ['linhptt3'], ['hoaltt']],
  },
  {
    t: 'Lệnh chi trên Bank admin',
    c: [['hoantp2'], ['lamttk'], ['anhntn18'], ['linhptt3']],
  },
  {
    t: 'Xử lý Alias chờ phê duyệt hàng ngày trên TPSS',
    c: [['yennth17'], ['hoaltt'], ['linhptt3'], ['lamttk']],
  },
  {
    t: 'Báo có Điện chuyển tiền ngoại tệ đến',
    c: [['anhntn18', 'linhptt3'], ['hoantp2', 'yennth17'], ['baodq', 'lamttk'], ['anhntn18', 'linhptt3']],
  },
  {
    t: 'Theo dõi xử lý tra soát ngoại tệ',
    c: [['anhntn18', 'linhptt3'], ['hoantp2', 'yennth17'], ['baodq', 'lamttk'], ['anhntn18', 'linhptt3']],
  },
  {
    t: 'Kiểm soát VFX cuối ngày',
    c: [['yennth17'], ['hoaltt'], ['linhptt3'], ['lamttk']],
  },
  {
    t: 'Theo dõi xử lý điện ngoại tệ trên Bank Admin, IB',
    c: [['yennth17'], ['lamttk'], ['linhptt3'], ['hoaltt']],
  },
  {
    t: 'Kế toán quỹ',
    c: [['baodq'], ['hoantp2'], ['anhntn18'], ['yennth17']],
  },
  {
    t: 'Quản lý, theo dõi, xử lý thẻ nuốt theo quy trình',
    c: [['hoaltt'], ['lamttk'], ['yennth17'], ['linhptt3']],
  },
  {
    t: 'Phòng chống rửa tiền',
    c: [['hoaltt'], [], [], []],
  },
];

export const DELEGATION_RULES: string[] = [
  'Lãnh đạo phòng thay thế theo Thông báo phân công: Ánh Nguyệt do Trần Thị Huyền thay; Trần Thị Huyền do Bích Vân thay; Bích Vân do Ánh Nguyệt thay.',
  'Lãnh đạo phòng nghỉ phép, đi học phải gửi mail trước 5 ngày làm việc; vắng trên 3 ngày phải lập biên bản bàn giao.',
  'Bảo Trân và Thùy Duyên dự phòng chéo; Hữu Thành và Minh Phong dự phòng chéo.',
  'Người dự phòng thủ kho, thủ quỹ do Phó phụ trách phòng chỉ định theo quy định, bảo đảm tách bạch nhiệm vụ.',
  'Khi giao dịch viên vắng, phó phòng phân công người cùng team tiếp nhận khách của các RM được ghép cặp.',
];

export const staffById: Record<string, StaffMember> = Object.fromEntries(STAFF.map((p) => [p.id, p]));
export const staffByUser: Record<string, StaffMember> = Object.fromEntries(STAFF.map((p) => [p.u, p]));

export function shortName(id: string): string {
  const person = staffById[id];
  if (!person) return id;
  const words = person.name.split(' ');
  const tail = words.slice(-2).join(' ');
  return /^Thị /.test(tail) ? person.name : tail;
}

export function getTeamColorClasses(team: TeamId) {
  switch (team) {
    case 1:
      return {
        text: 'text-teal-700 dark:text-teal-300',
        border: 'border-teal-200 dark:border-teal-800/80',
        bgSoft: 'bg-teal-50/70 dark:bg-teal-950/35',
        topBorder: 'border-t-teal-600 dark:border-t-teal-400',
      };
    case 2:
      return {
        text: 'text-blue-700 dark:text-blue-300',
        border: 'border-blue-200 dark:border-blue-800/80',
        bgSoft: 'bg-blue-50/70 dark:bg-blue-950/35',
        topBorder: 'border-t-blue-600 dark:border-t-blue-400',
      };
    case 3:
      return {
        text: 'text-rose-800 dark:text-rose-300',
        border: 'border-rose-200 dark:border-rose-800/80',
        bgSoft: 'bg-rose-50/70 dark:bg-rose-950/35',
        topBorder: 'border-t-rose-700 dark:border-t-rose-400',
      };
  }
}
